<script lang="ts">
	import { ROUTES } from '$lib/constants';
	import type { Prompt } from '$lib/models';
	import { MiroBoard } from '$lib/models/miro-board.model';
	import type { Conversation, Message } from '$lib/models/prompts/conversation.model';
	import { currentContext, miroSession, openAISettings } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import Icon from '@iconify/svelte';
	import {
		getModalStore,
		type ModalSettings,
		Avatar,
		ProgressRadial
	} from '@skeletonlabs/skeleton';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';
	import type { ConversationMessageBody } from '../../routes/miro/conversations/+server';
	import { readablestreamStore } from '$lib/readable-stream.store';

	export let conversation: Conversation;

	let chatHistory: Message[] = conversation.messages;
	let newMessage = '';
	const response = readablestreamStore();
	const userId = $miroSession?.user ?? '';
	const teamId = $miroSession?.team ?? '';

	let initialRun = true;
	$: {
		if (!initialRun) {
			conversation.addMessage(chatHistory[chatHistory.length - 1]);
			supabase
				.from('conversations')
				.upsert(
					{
						id: conversation.id !== 0 ? conversation.id : undefined,
						title: conversation.title,
						user_id: userId,
						team_id: teamId,
						messages: chatHistory,
						last_modified: new Date().toISOString()
					},
					{ onConflict: 'id' }
				)
				.select('id')
				.single()
				.then((res) => {
					if (res.data?.id) conversation.setId(res.data.id);
				});
		} else {
			initialRun = false;
		}
	}

	const runPrompt = async (prompt?: Prompt) => {
		if (!prompt && newMessage !== '') {
			chatHistory = [...chatHistory, { text: newMessage, role: 'human', promptType: 'freeForm' }];
			newMessage = '';
		} else if (prompt) {
			let text = prompt.toString();
			chatHistory = [...chatHistory, { text, role: 'human', promptType: prompt.type.key }];
		}

		try {
			let url = ROUTES.CONVERSATIONS + '?streaming=';
			url += $openAISettings.streaming === false ? 'false' : 'true';

			const body: ConversationMessageBody = {
				modelName: $openAISettings.model,
				messages: chatHistory,
				userId,
				teamId,
				conversationId: conversation.id
			};
			const answer = response.request(
				new Request(url, {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			);

			chatHistory = [
				...chatHistory,
				{ text: (await answer) as string, role: 'system', promptType: 'freeForm' }
			];
		} catch (err) {
			chatHistory = [
				...chatHistory,
				{ text: `Error: ${err}`, role: 'system', promptType: 'freeForm' }
			];
		}
	};

	// const getModelName = (key: string) => {
	// 	switch (key) {
	// 		case 'gpt-3.5-turbo':
	// 			return 'Chat-GPT';
	// 		case 'gpt-4':
	// 			return 'GPT-4';
	// 		default:
	// 			return 'Unknown';
	// 	}
	// };

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

	const modalStore = getModalStore();
	const triggerModal = (prompt: Prompt) => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'promptModal',
			meta: { prompt }
		};
		modalStore.trigger(modal);
	};

	onMount(() => {
		console.log(conversation);
		if (chatHistory[chatHistory.length - 1].role === 'human') runPrompt();
	});

	const maxMessageHeight = conversation.collection?.prompts ? 'max-h-[55vh]' : 'max-h-[70vh]';

	const onImportContext = () => {
		if (newMessage.length > 0) newMessage += '\n';
		newMessage += `Context:\n"${$currentContext}"`;
	};

	$: importClass = $currentContext === '' ? 'variant-filled-surface' : 'variant-filled-success';
</script>

<div class="{maxMessageHeight} overflow-y-auto" bind:this={div}>
	{#each chatHistory as message}
		<div class="card-soft p-4 space-y-2 mb-4">
			{#if message.role === 'system'}
				<header class="flex justify-between items-center">
					<div class="flex items-center gap-x-2">
						<Avatar
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
							width="w-8"
						/>
						<p class="font-bold">ChatBMI</p>
					</div>
					<small class="opacity-50">{new Date().toLocaleTimeString()}</small>
				</header>
				<p class="whitespace-pre-line text-sm">
					{message.text}
				</p>
				<button
					on:click={() => exportResponse(message.text)}
					class="btn btn-sm variant-filled-primary"
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
		<div class="card-soft p-4 space-y-2 mb-4">
			<header class="flex justify-between items-center">
				<div class="flex items-center gap-x-2">
					<Avatar
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
						width="w-8"
					/>
					<p class="font-bold">ChatBMI</p>
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

{#if conversation.collection?.prompts}
	<ol class="list max-h-[20vh] my-4 overflow-y-auto">
		{#each conversation.collection.prompts as prompt, i}
			<li class="card-soft p-2">
				<button
					class=" btn-icon variant-filled-success p-[6px] text-lg"
					on:click={() => runPrompt(prompt)}
				>
					<Icon icon="ion:play" />
				</button>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex flex-col overflow-hidden hover:cursor-pointer"
					on:click={() => triggerModal(prompt)}
				>
					<span class="whitespace-nowrap text-ellipsis overflow-hidden">
						{prompt.signifier}
					</span>
					<span class="text-sm italic !text-gray-700">{prompt.type.name}</span>
				</div>
			</li>
		{/each}
	</ol>
{/if}
<div
	class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-auto"
>
	<button
		title="Import miro context"
		disabled={$currentContext === ''}
		class={importClass}
		on:click={onImportContext}>+</button
	>
	<textarea
		on:keydown={($event) => {
			if ($event.key === 'Enter' && !$event.shiftKey) {
				$event.preventDefault();
				runPrompt();
			}
		}}
		bind:value={newMessage}
		disabled={$response.loading}
		class="bg-transparent border-0 ring-0"
		name="prompt"
		id="prompt"
		placeholder="Write a response..."
		rows="3"
	/>
	<button class="variant-filled-primary" disabled={newMessage == ''} on:click={() => runPrompt()}
		>Send</button
	>
</div>
