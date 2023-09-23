<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex gap-x-4 p-4 mb-4 items-center card-soft">
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-filled-primary"
		on:click={() => {
			goto(ROUTES.NEW_COLLECTION);
		}}><Icon icon="ion:plus" /></button
	>
	<h4 class="h4">Create a new Collection</h4>
</div>
<div class="overflow-y-auto">
	{#if data.collections.length > 0}
		{#each data.collections as collection}
			<div class="card-soft p-4 mb-4">
				<h3 class="h3 mb-2">
					{collection.title}
				</h3>
				<p class="mb-2">{collection.description}</p>
				<div class="flex justify-between">
					<div class="card variant-ghost-secondary py-2 px-4">
						{collection.prompts.length} Prompts
					</div>
					<button
						class="btn variant-filled-primary"
						on:click={() => goto(`/miro/collections/${collection.id}`)}>Open</button
					>
				</div>
			</div>
		{/each}
	{:else}
		<p>No collections found.</p>
	{/if}
</div>
