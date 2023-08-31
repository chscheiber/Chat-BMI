<script lang="ts">
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES } from '$lib';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col">
	{#each PROMPT_TYPES as promptType, i}
		<div class="my-3">
			<div class="flex justify-between mb-2">
				<h2 class="h2">{promptType.name}s</h2>
				<button
					type="button"
					class="btn-icon btn-icon-sm variant-filled ms-auto"
					on:click={() => {
						goto(`prompts/${promptType.key}`);
					}}><Icon icon="ion:arrow-back" rotate={2} /></button
				>
			</div>
			<p class="italic text-sm">{promptType.description}</p>
		</div>
		{#if i < PROMPT_TYPES.length - 1}
			<hr />
		{/if}
	{/each}
</div>
