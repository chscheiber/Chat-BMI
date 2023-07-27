<script lang="ts">
	import BackNav from '$lib/components/BackNav.svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Context from './Context.svelte';
	import PromptPreview from '$lib/components/Preview/PromptPreview.svelte';
	import { type Prompt, PromptFactory } from '$lib/models/prompts';

	export let data: PageData;
	export let prompt: Prompt = data.prompt ?? PromptFactory.createPrompt(data.params.prompt_type);

	let promptResponse: string | null = null;

	const complete = async () => {
		const res = await fetch(`/miro/${prompt.type.key}/${prompt.promptId}/preview`, {
			method: 'POST',
			body: JSON.stringify(prompt),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { message } = await res.json();
		promptResponse = message;
		return message;
	};
</script>

<div class="flex flex-col mb-6">
	<BackNav heading={prompt.name} lastPage={'/miro/' + prompt.type.key} />
</div>
{#if promptResponse === null}
	{#if !prompt.type.contextSelectable}
		<!-- Only one Step -->
		<PromptPreview {prompt} />
		<div class="flex justify-end">
			<button type="button" class="btn variant-filled">Run Prompt</button>
		</div>
	{:else}
		<Stepper buttonCompleteLabel="Run Prompt" on:complete={complete}>
			<Step>
				<svelte:fragment slot="header">Preview Prompt</svelte:fragment>
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
					<Context {prompt} />
				</Step>
			{/if}
		</Stepper>
	{/if}
{:else}
	<p class="whitespace-pre-line">{promptResponse}</p>
{/if}
