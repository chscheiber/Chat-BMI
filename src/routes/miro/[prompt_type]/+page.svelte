<script lang="ts">
	import { goto } from '$app/navigation';
	import BackNav from '$lib/components/BackNav.svelte';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	export let data: PageData;
</script>

<div class="flex flex-col mb-6">
	<BackNav heading={data.selectedPromptType?.name} />
	<span class="text-sm">{data.selectedPromptType?.description}</span>
</div>

{#if data.prompts.length > 0}
	<h4 class="h4 mb-2">Prompts:</h4>
	{#each data.prompts as prompt, i}
		<div class="flex items-center justify-between border-b-[1px] border-b-slate-400 mb-3 pb-3">
			<div class="flex flex-col">
				<h3 class="h3">{prompt.name}</h3>
				{#if prompt.description}
					<span class="text-sm">{prompt.description}</span>
				{/if}
			</div>
			<div>
				<button
					type="button"
					class="btn-icon btn-icon-sm variant-filled me-2"
					on:click={() => {
						goto(`/miro/${prompt.prompt_types?.type}/${prompt.id}/preview`, {
							state: { lastPage: data.selectedPromptType?.type }
						});
					}}><Icon icon="ion:arrow-back" rotate={2} /></button
				>
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
