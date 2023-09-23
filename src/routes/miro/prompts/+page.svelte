<script lang="ts">
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES } from '$lib';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col gap-y-2">
	{#each PROMPT_TYPES as promptType}
		<div class="card-soft p-4">
			<div class="flex justify-between mb-2">
				<h2 class="h2">{promptType.name}s</h2>
				<button
					type="button"
					class="btn-icon btn-icon-sm variant-filled-primary ms-auto"
					on:click={() => {
						goto(`prompts/${promptType.key}`);
					}}><Icon icon="ion:arrow-forward" /></button
				>
			</div>
			<hr />
			<p class="italic text-sm mt-2">{promptType.description}</p>
		</div>
	{/each}
</div>
