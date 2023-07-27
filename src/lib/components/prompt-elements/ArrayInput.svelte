<script lang="ts">
	import Icon from '@iconify/svelte';

	export let inputArray: string[] = ['', '', 'asdf'];
</script>

<div class="flex flex-col gap-y-4">
	{#each inputArray as value, index}
		<div class="flex gap-x-2 items-center">
			<input type="text" class="flex-1" bind:value name={`${index}`} />
			<button
				type="button"
				class="btn btn-icon btn-icon-sm variant-filled"
				on:click={() => (inputArray = inputArray.splice(index))}><Icon icon="ion:minus" /></button
			>
		</div>
	{/each}
</div>
