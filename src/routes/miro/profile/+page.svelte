<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { openAISettings } from '../../../store';

	export let data: PageData;

	let llmSettings = $openAISettings;

	const submitForm = (e: Event) => {
		e.preventDefault();
		if (browser) {
			localStorage.setItem('llmSettings', JSON.stringify(llmSettings));
			alert('Settings saved.');
		} else {
			alert('Failed to save settings.');
		}
	};
</script>

<form class="flex flex-col" on:submit={submitForm}>
	<label class="label">
		<span>Model</span>
		<select class="select" bind:value={llmSettings.model}>
			<option value="gpt-3.5-turbo" selected>Chat-GPT</option>
			<option value="gpt-4">GPT-4</option>
		</select>
	</label>

	<label class="label"
		><span>Open AI Key</span>
		<input class="input" type="password" placeholder="sk-xxx" bind:value={llmSettings.key} /></label
	>
	<button class="btn variant-filled mt-4 self-end" type="submit">Save</button>
</form>
