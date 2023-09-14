<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DataListItem, DataListSettings } from './data-list';
	import { goto } from '$app/navigation';

	export let settings: DataListSettings;
	export let items: DataListItem[] = [];
</script>

{#if settings.add && settings.add.allow}
	<div class="card flex gap-x-4 p-4 mb-4 items-center">
		<button
			type="button"
			class="btn-icon btn-icon-sm variant-filled"
			on:click={() => {
				goto(settings.add?.path ?? 'miro');
			}}><Icon icon="ion:plus" /></button
		>
		<h4 class="h4">Create a new {settings.title}</h4>
	</div>
{/if}

{#if items.length > 0}
	<div class="card-soft p-4 flex flex-col gap-y-4">
		{#each items as item, i}
			<a href={item.href}>
				<div class="flex flex-col">
					<h3 class="h3">{item.title}</h3>
					<p class="text-sm">{item.subtitle}</p>
				</div>
			</a>
			{#if i < items.length - 1}
				<hr class="b-color-black h-[2px]" />
			{/if}
		{/each}
	</div>
{:else}
	<div class="alert variant-filled-error">
		<div class="flex items-center">
			<Icon icon="octicon:alert-16" class="text-lg me-3" />
			<p class="alert-message">No {settings.elementNames} found.</p>
		</div>
	</div>
{/if}
