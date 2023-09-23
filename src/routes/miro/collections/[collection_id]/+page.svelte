<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES, type Prompt } from '$lib';
	import { Conversation } from '$lib/models/prompts/conversation.model';
	import { currentContext, loading, miroSession, newConversation } from '$lib/store';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { DeleteCollectionBody } from './+server';

	export let data: PageData;

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const openModal = (prompt: Prompt) => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'promptModal',
			meta: { prompt }
		};
		modalStore.trigger(modal);
	};

	const deleteCollection = async () => {
		if (!confirm('Are you sure you want to delete this collection?')) return;
		const userId = $miroSession?.user;
		if (!userId) {
			alert('Could not retrieve user id');
			return;
		}
		const body: DeleteCollectionBody = {
			userId
		};
		try {
			loading.set(true);
			const response = await fetch(`${ROUTES.COLLECTIONS}/${data.collection.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const { success } = await response.json();
			if (success) {
				toastStore.trigger({
					message: 'Collection deleted successfully',
					background: 'variant-filled-success'
				});
				goto(ROUTES.COLLECTIONS);
			} else {
				toastStore.trigger({
					message: 'Could not delete collection',
					background: 'variant-filled-error'
				});
			}
		} catch (error) {
			alert(error);
		} finally {
			loading.set(false);
		}
	};

	const runCollection = async () => {
		if (
			$currentContext === '' &&
			!confirm('Are you sure you want to run this collection without context?')
		)
			return;
		const conversation = new Conversation({
			userId: $miroSession?.user ?? '',
			teamId: $miroSession?.team ?? '',
			title: data.collection.title,
			collection: data.collection
		});
		newConversation.set(conversation);
		goto(ROUTES.NEW_CONVERSATION);
	};

	$: selectedClass = $currentContext !== '' ? 'variant-filled-success ' : 'variant-filled-warning';
</script>

<!-- <BackNav heading="Collections" /> -->
<div class="card-soft p-4">
	<h3 class="h3 mb-4">{data.collection.title}</h3>
	<p>{data.collection.description}</p>
	<h4 class="h4 my-2">Prompts:</h4>
	<ol class="list max-h-[30vh] overflow-y-auto">
		{#each data.collection.prompts as prompt, i}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li class="card-soft !rounded-lg p-3 hover:cursor-pointer" on:click={() => openModal(prompt)}>
				<span class="badge !rounded-lg bg-primary-500 text-white">{i + 1}.</span>
				<div class="flex flex-col overflow-hidden">
					<span class="whitespace-nowrap text-ellipsis overflow-hidden">
						{prompt.name}
					</span>
					<span class="text-sm italic !text-gray-700">{prompt.type.name}</span>
				</div>
			</li>
		{/each}
	</ol>
	<div class="flex justify-between mt-4">
		{#if $miroSession?.user === data.collection.userId}
			<button class="btn variant-filled-error" on:click={deleteCollection}>Delete</button>
		{/if}
		<button class="btn ms-auto {selectedClass}" on:click={runCollection}>Run</button>
	</div>
</div>
