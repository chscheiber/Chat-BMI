<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib';
	import PromptPreview from '$lib/components/Preview/PromptPreview.svelte';
	import { PromptFactory, type Prompt, type PromptTypeKey } from '$lib/models/prompts';
	import { Conversation } from '$lib/models/prompts/conversation.model';
	import { loading, newConversation, newPrompt } from '$lib/store';
	import { Step, Stepper, getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import Context from '$lib/components/Context.svelte';

	export let data: PageData;
	export let form: ActionData;

	const toast = getToastStore();
	let prompt: Prompt;

	if ($newPrompt) {
		prompt = $newPrompt;
		newPrompt.set(null);
	} else {
		prompt = data.prompt
			? data.prompt
			: PromptFactory.createPrompt(data.params.prompt_type as PromptTypeKey);
	}

	$: if (form?.error) toast.trigger({ message: form.error, background: 'variant-filled-error' });
	let htmlForm: HTMLFormElement;
	let locked = false;
</script>

<Stepper
	buttonCompleteLabel="Run Prompt"
	buttonNext="variant-filled-primary"
	on:complete={() => {
		const conversation = new Conversation({
			prompt: prompt,
			title: prompt.signifier,
			userId: prompt.userId,
			teamId: prompt.teamId
		});
		newConversation.set(conversation);
		goto(ROUTES.NEW_CONVERSATION);
	}}
	on:next={() => {
		console.log(htmlForm?.checkValidity());
	}}
>
	<Step {locked}>
		<svelte:fragment slot="header">
			<div class="flex flex-col">
				{prompt.name}
				<span class="text-sm">{prompt.type.name}</span>
			</div>
		</svelte:fragment>
		<form
			bind:this={htmlForm}
			method="post"
			class="gap-y-4 flex-col flex"
			use:enhance={() => {
				loading.set(true);
				return async ({ update }) => {
					await update();
					loading.set(false);
				};
			}}
		>
			<PromptPreview bind:prompt />
		</form>
	</Step>
	<Step>
		<svelte:fragment slot="header">Select Context</svelte:fragment>
		<Context bind:prompt />
	</Step>
</Stepper>
