<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { openAIKey } from '../../../store';

	export let data: PageData;

	let key = $openAIKey;
	const storeKey = (key: string | null) => {
		if (browser && key) {
			window.localStorage.setItem('OPENAI_API_KEY', key);
			alert('Key stored!');
		} else {
			alert('Key not stored!');
		}
	};

	const retrieveKey = () => {
		if (browser) {
			return window.localStorage.getItem('OPENAI_API_KEY');
		}
	};

	onMount(() => {
		const storedKey = retrieveKey();
		if (storedKey) {
			key = storedKey;
			openAIKey.set(key);
		}
	});
</script>

<div class="flex flex-col">
	<label class="label"
		><span>Open AI Key</span> <input class="input" type="text" bind:value={key} /></label
	>
	<button class="btn variant-filled mt-4 self-end" on:click={() => storeKey(key)}>Save</button>
</div>
