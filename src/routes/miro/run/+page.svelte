<script lang="ts">
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { currentPrompts } from '../../../store';
	import BackNav from '$lib/components/BackNav.svelte';
	import { onMount } from 'svelte';
	import { Chat } from '$lib';

	const prompts = $currentPrompts;
	const prompt = prompts[0];
	// No prompt selected, go back to the main page
	if (!prompt) {
		goto('/miro');
	}

	let awaitPromptResponse = false;
	let promptResponse: string;

	const runPrompt = async () => {
		if (!prompt) return;
		awaitPromptResponse = true;
		const res = await fetch(`/miro/${prompt.type.key}/${prompt.promptId}/preview`, {
			method: 'POST',
			body: JSON.stringify(prompt),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { message } = await res.json();
		promptResponse = message;
		awaitPromptResponse = false;
		return message;
	};
	onMount(() => runPrompt());
</script>

<div class="flex flex-col mb-4">
	<BackNav heading="Run prompt" />
</div>
{#if awaitPromptResponse}
	<div class="h-[96vh] grid place-items-center">
		<ProgressRadial />
	</div>
{:else}
	<Chat {promptResponse} />
{/if}
