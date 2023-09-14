<script lang="ts">
	import { PUBLIC_MIRO_ADMIN_ID } from '$env/static/public';
	import { Collection, ROUTES, type Prompt } from '$lib';
	import PromptFinder from '$lib/components/StartingPage/PromptFinder.svelte';
	import { loading, miroSession } from '$lib/store';
	import {
		Step,
		Stepper,
		getModalStore,
		type ModalSettings,
		getToastStore
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import type { NewCollectionBody } from '../+server';
	import jwtDecode from 'jwt-decode';
	import type { MiroSession } from '../../types';
	import BackNav from '$lib/components/BackNav.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form;
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

	let prompts: Prompt[] = [];
	const promptSelected = (event: { detail: { prompt: Prompt } }) => {
		const prompt = event.detail.prompt;
		if (!prompts.includes(prompt)) prompts = [...prompts, prompt];
		else alert('Prompt already added');
	};

	const removePrompt = (index: number) => {
		prompts = [...prompts.slice(0, index), ...prompts.slice(index + 1)];
	};

	const collection = new Collection({});
	$: collection.prompts = prompts;

	const onSubmit = async () => {
		miroSession.set(jwtDecode<MiroSession>(await miro.board.getIdToken()));
		const userId = $miroSession?.user;
		const teamId = $miroSession?.team;
		if (!userId || !teamId) {
			alert('Could not retrieve user or team id');
			return;
		}

		if (!collection.title || !collection.description || !collection.visibility) {
			alert('Please fill out all fields');
			return;
		}

		if (collection.prompts.length === 0) {
			alert('Please add at least one prompt');
			return;
		}

		const body: NewCollectionBody = {
			userId,
			teamId,
			description: collection.description,
			title: collection.title,
			visibility: collection.visibility,
			promptIds: collection.prompts.map((prompt) => prompt.promptId)
		};
		try {
			loading.set(true);
			const response = await fetch('/miro/collections', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const { success } = await response.json();
			if (success) {
				toastStore.trigger({
					message: 'Collection created successfully',
					background: 'variant-filled-success'
				});
				goto(ROUTES.COLLECTIONS);
			} else {
				toastStore.trigger({
					message: 'Collection could not be created',
					background: 'variant-filled-error'
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading.set(false);
		}
	};
</script>

<BackNav heading="Collections" />
<form on:submit|preventDefault={onSubmit}>
	<Stepper buttonCompleteLabel="Save Collection" buttonCompleteType="submit">
		<Step>
			<svelte:fragment slot="header">Collection Data</svelte:fragment>
			<label class="label">
				<span>Title*</span>
				<input class="input" type="text" name="title" required bind:value={collection.title} />
			</label>
			<label class="label">
				<span>Description*</span>
				<textarea
					class="textarea"
					name="description"
					required
					rows="4"
					bind:value={collection.description}
				/>
			</label>
			<label class="label">
				<span>Visibility*</span>
				<select class="input" bind:value={collection.visibility}>
					<option value="private">Private</option>
					<option value="team">Team</option>
					<option value="public" disabled={$miroSession?.user !== PUBLIC_MIRO_ADMIN_ID}
						>Public</option
					>
				</select>
			</label>
		</Step>
		<Step>
			<svelte:fragment slot="header">Prompts</svelte:fragment>

			<PromptFinder options={{ showAddPromptButton: true }} on:promptSelected={promptSelected} />

			<h3 class="h3 my-4">Added Prompts:</h3>
			{#if prompts.length > 0}
				<ol class="list max-h-[30vh] overflow-y-auto">
					{#each prompts as prompt, i}
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							class="card-soft !rounded-lg p-3 hover:cursor-pointer"
							on:click={() => openModal(prompt)}
						>
							<span class="badge !rounded-lg bg-primary-500">{i + 1}.</span>
							<div class="flex flex-col overflow-hidden">
								<span class="whitespace-nowrap text-ellipsis overflow-hidden">
									{prompt.signifier}
								</span>
								<span class="text-sm italic !text-gray-700">{prompt.type.name}</span>
							</div>
							<button
								type="button"
								class="btn btn-icon variant-filled self-start"
								on:click|stopPropagation={() => removePrompt(i)}><Icon icon="ion:close" /></button
							>
						</li>
					{/each}
				</ol>
			{:else}
				<span class="italic text-gray-600">No prompts added yet.</span>
			{/if}
		</Step>
	</Stepper>
</form>
