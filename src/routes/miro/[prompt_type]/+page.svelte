<script lang="ts">
	import { goto } from '$app/navigation';
	import { MiroContext, type Prompt } from '$lib';
	import BackNav from '$lib/components/BackNav.svelte';
	import { currentPrompts } from '../../../store';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	export let data: PageData;

	const runPrompt = async (prompt: Prompt) => {
		const items = await (window as any).miro.board.getSelection();

		const context = new MiroContext(items);
		prompt.context = await context.miroContent;

		currentPrompts.set(prompt);
		goto(`/miro/run`);
	};
</script>

<!-- <div class="flex flex-col">
	<BackNav heading={data.promptType.name} />
	<span class="text-sm">{data.promptType.description}</span>
</div> -->

<div class="flex gap-x-2 mb-8 items-center">
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-filled me-2"
		on:click={() => {
			goto(`/miro/${data.promptType.key}/new/preview`, {
				state: { lastPage: data.promptType.key }
			});
		}}><Icon icon="ion:plus" /></button
	>
	<h4 class="h4">Create new {data.promptType.name}</h4>
</div>

{#if data.prompts.length > 0}
	<h4 class="h4 mb-2">Saved Prompts</h4>
	{#each data.prompts as prompt}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex border-b-[1px] border-b-slate-400 mb-3 pb-3 prompt"
			on:click={() => {
				goto(`/miro/${data.promptType.key}/${prompt.promptId}/preview`, {
					state: { lastPage: data.promptType.key }
				});
			}}
		>
			<div class="flex flex-col flex-grow">
				<div class="flex items-center justify-between">
					<h3 class="h3">
						<a href={`/miro/${data.promptType.key}/${prompt.promptId}/preview`}>{prompt.name}</a>
					</h3>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled ms-auto"
						on:click={(event) => {
							event.stopPropagation();
							runPrompt(prompt);
						}}><Icon icon="ion:arrow-back" rotate={2} /></button
					>
				</div>
				<div class="flex items-center gap-x-4">
					{#if prompt.description}
						<span class="text-sm">{prompt.description}</span>
					{/if}
				</div>
			</div>
		</div>
	{/each}
{:else}
	<div class="alert variant-filled-error">
		<div class="flex items-center">
			<Icon icon="octicon:alert-16" class="text-lg me-3" />
			<p class="alert-message">No prompts found.</p>
		</div>
	</div>
{/if}

<style>
	.prompt:hover {
		cursor: pointer;
	}
</style>
