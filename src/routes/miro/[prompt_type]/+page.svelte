<script lang="ts">
	import { goto } from '$app/navigation';
	import BackNav from '$lib/components/BackNav.svelte';
	import { executedPrompts } from '../../../store';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	export let data: PageData;
</script>

<div class="flex flex-col mb-6">
	<BackNav heading={data.selectedPromptType?.name} />
	<span class="text-sm">{data.selectedPromptType?.description}</span>
</div>

{#if data.prompts.length > 0}
	{#each data.prompts as prompt, i}
		<div class="flex items-center mb-4">
			<button
				type="button"
				class="btn-icon btn-icon-sm variant-filled me-2"
				on:click={() => {
					executedPrompts.play(prompt);
					goto('chat', { state: { lastPage: data.selectedPromptType?.type } });
				}}><Icon icon="ion:play" /></button
			>
			<div class="flex flex-col">
				<h3 class="h3">{prompt.name}</h3>
				<span class="text-sm">{prompt.signifier}</span>
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
