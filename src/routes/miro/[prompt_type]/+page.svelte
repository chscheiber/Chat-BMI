<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;
</script>

<div class="flex flex-col mb-6">
	<div class="flex items-center mb-2">
		<a class="btn-icon btn-icon-sm variant-filled me-2" href="/miro"
			><Icon icon="ion:arrow-back" /></a
		>
		<h2 class="h2 mb-0 pb-0">{data.selectedPromptType?.name}</h2>
	</div>
	<span class="text-sm">{data.selectedPromptType?.description}</span>
</div>

{#if data.prompts.length > 0}
	<ul class="list">
		{#each data.prompts as prompt}
			<div class="flex">
				<!-- <buton type="button" class="btn-icon btn-icon-sm variant-filled me-2"><MdiPlay /></buton> -->
				<button type="button" class="btn-icon btn-icon-sm variant-filled me-2"
					><Icon icon="ion:play" /></button
				>
				<li class="list-item"><h3 class="h3">{prompt.name}</h3></li>
			</div>
			<span class="text-sm">{prompt.signifier}</span>
		{/each}
	</ul>
{:else}
	<div class="alert variant-filled-error">
		<div class="flex items-center">
			<Icon icon="octicon:alert-16" class="text-lg me-3" />
			<p class="alert-message">No prompts found.</p>
		</div>
	</div>
{/if}
