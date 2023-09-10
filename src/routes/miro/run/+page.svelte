<script lang="ts">
	import { MiroBoard } from '$lib/models/miro-board.model';
	import { Conversation, type Message } from '$lib/models/prompts/conversation.model';
	import { readablestreamStore } from '$lib/readable-stream.store';
	import { currentContext, currentPrompts, miroSession, openAISettings } from '$lib/store';
	import { Avatar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import type { ConversationMessageBody } from './+server';

	const prompt = $currentPrompts[0];
	prompt.context = $currentContext;
	const conversation = new Conversation(prompt);
	const response = readablestreamStore();
	let newMessage = '';
	let awaitingResponse = true;

	prompt.context = $currentContext;
	let chatHistory: Message[] = [{ text: prompt.toString(), role: 'human' }];
	$: conversation.addMessage(chatHistory[chatHistory.length - 1]);

	const runPrompt = async () => {
		awaitingResponse = true;
		if (newMessage !== '') chatHistory = [...chatHistory, { text: newMessage, role: 'human' }];
		newMessage = '';

		const userId = $miroSession ? Number($miroSession.user) : -1;

		try {
			let url = '/miro/run?streaming=';
			url += $openAISettings.streaming === false ? 'false' : 'true';

			const body: ConversationMessageBody = {
				promptType: prompt.type.key,
				modelName: $openAISettings.model,
				messages: chatHistory,
				userId
			};

			console.log(body);
			const answer = response.request(
				new Request(url, {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			);

			chatHistory = [...chatHistory, { text: (await answer) as string, role: 'system' }];
			awaitingResponse = false;
		} catch (err) {
			chatHistory = [...chatHistory, { text: `Error: ${err}`, role: 'system' }];
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

	let div: any;
	let autoscroll = false;

	beforeUpdate(() => {
		if (div) {
			const scrollableDistance = div.scrollHeight - div.offsetHeight;
			autoscroll = div.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll && div) {
			div.scrollTo(0, div.scrollHeight);
		}
	});

	const exportResponse = async (message: string) => {
		MiroBoard.writeToBoard(message);
	};

	onMount(() => runPrompt());
</script>

<!-- <div class="flex flex-col mb-4">
	<BackNav heading="Run prompt" />
</div> -->
<div class="max-h-[75vh] overflow-y-auto pr-4" bind:this={div}>
	{#each chatHistory as message}
		<div class="card p-4 variant-soft space-y-2 mb-4">
			{#if message.role === 'system'}
				<header class="flex justify-between items-center">
					<div class="flex items-center gap-x-2">
						<Avatar
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
							width="w-8"
						/>
						{#if prompt}
							<p class="font-bold">{getModelName($openAISettings.model)}</p>
						{/if}
					</div>
					<small class="opacity-50">{new Date().toLocaleTimeString()}</small>
				</header>
				<p class="whitespace-pre-line text-sm">
					{message.text}
				</p>
				<button
					on:click={() => exportResponse(message.text)}
					class="btn variant-filled-primary"
					title="Export content to Miro Board">Export to Miro Board</button
				>
			{:else}
				<header class="flex justify-between items-center">
					<small class="opacity-50">{new Date().toLocaleTimeString()}</small>

					<div class="flex items-center gap-x-2">
						<p class="font-bold">User</p>

						<!-- <Avatar
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
						width="w-8"
					/> -->
					</div>
				</header>
				<p class="whitespace-pre-line text-sm">
					{message.text}
				</p>
			{/if}
		</div>
	{/each}
	{#if $response.loading}
		<div class="card p-4 variant-soft space-y-2 mb-4">
			<header class="flex justify-between items-center">
				<div class="flex items-center gap-x-2">
					<Avatar
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
						width="w-8"
					/>
					{#if prompt}
						<p class="font-bold">{getModelName($openAISettings.model)}</p>
					{/if}
				</div>
				<small class="opacity-50">{new Date().toLocaleTimeString()}</small>
			</header>
			<p class="whitespace-pre-line text-sm">
				{#if $response.loading && $response.text === ''}
					<ProgressRadial width={'w-10'} stroke={100} class="p-2" />
				{:else}
					{$response.text}
				{/if}
			</p>
		</div>
	{/if}
</div>
<!-- <p class="whitespace-pre-line text-sm">
	{#if $response.loading && $response.text === ''}
		<ProgressRadial width={'w-10'} stroke={100} />
	{:else if $response.loading}
		{$response.text}
	{:else}
		{reply}
	{/if}
</p>
{#if !awaitingResponse}
	<button
		on:click={exportResponse}
		class="btn variant-filled-primary"
		title="Export content to Miro Board">Export to Miro Board</button
	>
{/if} -->
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

<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token mt-auto">
	<textarea
		bind:value={newMessage}
		disabled={$response.loading}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a response..."
		rows="3"
	/>
	<button class="variant-filled-primary" disabled={newMessage == ''} on:click={runPrompt}
		>Send</button
	>
</div>
