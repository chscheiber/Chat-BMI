<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib';
	import BackNav from '$lib/components/BackNav.svelte';
	import PromptPreview from '$lib/components/Preview/PromptPreview.svelte';
	import { PromptFactory, type Prompt, type PromptTypeKey } from '$lib/models/prompts';
	import { Conversation } from '$lib/models/prompts/conversation.model';
	import { loading, newConversation, newPrompt } from '$lib/store';
	import { Step, Stepper, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Context from './Context.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form;

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
</script>

<BackNav heading={prompt.name ?? 'New Prompt'} />

<Stepper
	buttonCompleteLabel="Run Prompt"
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
>
	<form
		method="post"
		use:enhance={() => {
			loading.set(true);

			return async ({ update }) => {
				await update();
				loading.set(false);
			};
		}}
	>
		<Step>
			<svelte:fragment slot="header">{prompt.type.name}</svelte:fragment>
			<PromptPreview bind:prompt />
		</Step>
	</form>
	{#if prompt.type.dbQueriesSelectable && false}
		<Step>
			<svelte:fragment slot="header">DB Queries</svelte:fragment>
			<p>Add or edit your database queries.</p>
			<p>Leave blank if you dont want any database knowledge added.</p>
		</Step>
	{/if}
	{#if prompt.type.contextSelectable}
		<Step>
			<svelte:fragment slot="header">Select Context</svelte:fragment>
			<Context bind:prompt />
		</Step>
	{/if}
</Stepper>
