<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { loading, openAISettings } from '$lib/store';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;

	let llmSettings = $openAISettings;

	const submitForm = (e: Event) => {
		if (browser) {
			loading.set(true);
			openAISettings.set(llmSettings);
			goto('/miro');
			toastStore.trigger({ message: 'Settings saved', background: 'variant-filled-success' });
			loading.set(false);
		}
	};
</script>

<form class="flex flex-col gap-y-4" on:submit|preventDefault={submitForm}>
	<label class="label">
		<span>Model</span>
		<select class="select" bind:value={llmSettings.model}>
			<option value="gpt-3.5-turbo" selected>Chat-GPT</option>
			<option value="gpt-4">GPT-4</option>
		</select>
	</label>

	<label class="label">
		<span>Response Type</span>
		<select class="select" bind:value={llmSettings.streaming}>
			<option value={true} selected>Streaming</option>
			<option value={false}>Wait for response</option>
		</select>
	</label>

	<!-- <label class="label"
		><span>Open AI Key</span>
		<input class="input" type="password" placeholder="sk-xxx" bind:value={llmSettings.key} /></label
	> -->
	<button class="btn variant-filled mt-4 self-end" type="submit">Save</button>
</form>
