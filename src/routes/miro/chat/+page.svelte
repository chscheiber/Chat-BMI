<script lang="ts">
	import { browser } from '$app/environment';
	import BackNav from '$lib/components/BackNav.svelte';
	import { latestPrompt } from '../../../store';
	let lastPage = '/miro';

	if (browser) {
		lastPage += '/' + window.history.state['lastPage'];
	}
</script>

<BackNav heading={'Chat'} {lastPage} />
{#if $latestPrompt}
	{$latestPrompt.signifier}
{/if}
