<script lang="ts">
	import { browser } from '$app/environment';
	import BackNav from '$lib/components/BackNav.svelte';
	import Icon from '@iconify/svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	let lastPage = '/miro';
	let serverMessage = '';
	let loading = false;

	export let data;
	export let form;

	if (browser) {
		// if (!$latestPrompt) {
		// 	goto('/miro');
		// }
		lastPage += '/' + window.history.state['lastPage'];
	}

	console.log(form);

	const playPrompt = async () => {
		// serverMessage = '';
		// loading = true;
		// const res = await fetch('/miro/chat', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({ prompt: $latestPrompt })
		// });
		// const data = await res.json();
		// serverMessage = data.message;
		// loading = false;
	};
</script>

<!-- <BackNav heading={$latestPrompt?.name ?? ''} {lastPage} />
{#if $latestPrompt}
	<div class="flex justify-between items-center mt-6">
		{$latestPrompt.description}
		<button type="button" class="btn-icon variant-filled me-2" on:click={playPrompt}
			><Icon icon="ion:play" /></button
		>
	</div>
{/if} -->

{#if loading}
	<div class="grid flex-1 place-content-center">
		<ProgressRadial />
	</div>
{/if}
{#if serverMessage}
	<h2 class="h2 mt-4">Output:</h2>
	<p class="whitespace-pre-line">{serverMessage}</p>
{/if}
