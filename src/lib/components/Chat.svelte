<script lang="ts">
	import type { Prompt } from '$lib/models';
	import { Conversation } from '$lib/models/prompts/conversation.model';
	import { readablestreamStore } from '$lib/readable-stream.store';
	import { Avatar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { currentContext, openAISettings } from '../store';
	export let prompt: Prompt;
	const conversation = new Conversation(prompt);

	const response = readablestreamStore();
	let reply = '';
	const runPrompt = async () => {
		if (!prompt) return;
		if ($openAISettings.model) prompt.llmModelName = $openAISettings.model;
		try {
			prompt.context = $currentContext;
			console.log(JSON.stringify({ prompt, key: $openAISettings.key }));
			const answer = response.request(
				new Request(`/api/run`, {
					method: 'POST',
					body: JSON.stringify({
						prompt,
						key: $openAISettings.key,
						streaming: $openAISettings.streaming
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			);
			reply = (await answer) ?? '';
			conversation.addMessage(reply, 'system');
		} catch (err) {
			reply = 'Could not run prompt.\n\n' + 'Check if you have set the correct Open AI Api key.';
		}
	};

	const getModelName = (key: string) => {
		switch (key) {
			case 'gpt-3.5-turbo':
				return 'Chat-GPT';
			case 'gpt-4':
				return 'GPT-4';
			default:
				return 'Unknown';
		}
	};

	onMount(() => runPrompt());
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
		width="w-10"
	/>
	<div class="card p-4 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">{getModelName(prompt.llmModelName)}</p>
			<small class="opacity-50">{new Date().toLocaleTimeString()}</small>
		</header>
		<p class="whitespace-pre-line text-sm">
			{#if $response.loading && $response.text === ''}
				<ProgressRadial width={'w-10'} stroke={100} />
			{:else if $response.loading}
				{$response.text}
			{:else}
				{reply}
			{/if}
		</p>
		<!-- {#if reply}
			<div class="flex justify-end pb-0">
				<button class="btn-icon btn-icon-sm variant-filled" use:clipboard={reply}
					><Icon icon="ion:copy-outline" /></button
				>
			</div>
		{/if} -->
	</div>
</div>
<!-- <div class="grid grid-cols-[1fr_auto] gap-2">
	<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
		<header class="flex justify-between items-center">
			<p class="font-bold">{bubble.name}</p>
			<small class="opacity-50">{bubble.timestamp}</small>
		</header>
		<p>{bubble.message}</p>
	</div>
	<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
</div> -->

<!-- <div
	class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-auto"
>
	<button class="input-group-shim" disabled>+</button>
	<textarea
		disabled
		bind:value={currentMessage}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a message..."
		rows="1"
	/>
	<button class="variant-filled-primary" disabled>Send</button>
</div> -->
