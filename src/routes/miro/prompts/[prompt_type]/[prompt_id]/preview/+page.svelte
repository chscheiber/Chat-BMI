<script lang="ts">
	import { goto } from '$app/navigation';
	import BackNav from '$lib/components/BackNav.svelte';
	import { PromptFactory, type Prompt, type PromptTypeKey } from '$lib/models/prompts';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Context from './Context.svelte';
	import PromptPreview from '$lib/components/Preview/PromptPreview.svelte';
	import { currentPrompts, newPrompt } from '$lib/store';

	export let data: PageData;
	let prompt: Prompt;

	if ($newPrompt) {
		prompt = $newPrompt;
		newPrompt.set(null);
	} else {
		prompt = data.prompt
			? data.prompt
			: PromptFactory.createPrompt(data.params.prompt_type as PromptTypeKey);
	}
</script>

<BackNav heading={prompt.name ?? 'New Prompt'} />

<Stepper
	buttonCompleteLabel="Run Prompt"
	on:complete={() => {
		currentPrompts.set(prompt);
		goto('/miro/run');
	}}
>
	<Step>
		<svelte:fragment slot="header">{prompt.type.name}</svelte:fragment>
		<PromptPreview bind:prompt />
	</Step>
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
