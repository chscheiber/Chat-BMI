<script lang="ts">
	import { browser } from '$app/environment';
	import BackNav from '$lib/components/BackNav.svelte';
	import Icon from '@iconify/svelte';
	import { latestPrompt } from '../../../store';
	let lastPage = '/miro';
	let serverMessage = '';

	if (browser) {
		lastPage += '/' + window.history.state['lastPage'];
	}

	const playPrompt = async () => {
		const res = await fetch('/miro/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt: $latestPrompt })
		});
		const data = await res.json();
		serverMessage = data.message;
	};
</script>

<BackNav heading={'Chat'} {lastPage} />
{#if $latestPrompt}
	<button type="button" class="btn-icon btn-icon-sm variant-filled me-2" on:click={playPrompt}
		><Icon icon="ion:play" /></button
	>
	{$latestPrompt.signifier}
{/if}
{#if serverMessage}
	<h2 class="h2 mt-4">Output:</h2>
	<p>{@html serverMessage}</p>
{/if}
