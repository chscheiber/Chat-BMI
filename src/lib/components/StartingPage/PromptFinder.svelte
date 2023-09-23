<script lang="ts">
	import { PromptFactory, type Prompt, type PromptData, type PromptTypeKey } from '$lib/models';
	import { ProgressRadial, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import RunConfigButtons from '../RunConfigButtons.svelte';
	import { miroSession } from '$lib/store';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	let prompts: Prompt[] = [];
	let searchValue = '';

	export let options: {
		showRunConfigButtons?: boolean;
		showAddPromptButton?: boolean;
	} = {};

	const dispatch = createEventDispatcher();
	const promptSelected = (prompt: Prompt) => {
		dispatch('promptSelected', { prompt });
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

	let timer: NodeJS.Timeout;
	let loading = false;
	const debounce = (e: any) => {
		clearTimeout(timer);
		if (e.target.value == '') {
			searchValue = e.target.value;
		} else {
			timer = setTimeout(() => {
				searchValue = e.target.value;
			}, 300);
		}
	};

	$: {
		const queryPrompts: Prompt[] = [];
		if (searchValue != '' && searchValue.length > 2) {
			loading = true;
			const userId = $miroSession?.user ?? -1;
			const teamId = $miroSession?.team ?? -1;
			fetch(`/api/prompts?value=${searchValue}&user-id=${userId}&team-id=${teamId}&limit=5`)
				.then((res) => res.json())
				.then((data: PromptData[]) => {
					for (const promptData of data) {
						queryPrompts.push(
							PromptFactory.createPrompt(promptData.type as PromptTypeKey, promptData)
						);
					}
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					prompts = queryPrompts;
					loading = false;
				});
		} else {
			prompts = [];
		}
	}

	const buttonClasses =
		options.showAddPromptButton || options.showRunConfigButtons
			? 'grid grid-cols-[minmax(0px,_1fr)_48px]'
			: '';
</script>

<div class="card-soft p-4">
	<input
		class="input mb-4"
		type="search"
		placeholder="Search prompts..."
		name="prompts"
		on:input={debounce}
	/>
	{#if prompts.length > 0}
		<div class="flex flex-col gap-y-4">
			{#each prompts as prompt (prompt.promptId)}
				<div class="{buttonClasses} card gap-x-4 rounded-container-token hover:cursor-pointer">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="p-2 overflow-hidden" on:click={() => triggerModal(prompt)}>
						<h5 class="h5 whitespace-nowrap overflow-hidden text-ellipsis font-bold">
							{prompt.name}
						</h5>
						<p class=" whitespace-nowrap overflow-hidden text-ellipsis">
							{prompt.signifier}
						</p>
					</div>
					{#if options.showRunConfigButtons}
						<RunConfigButtons {prompt} />
					{:else if options.showAddPromptButton}
						<button
							type="button"
							class="variant-filled-primary flex justify-center items-center rounded-r-md text-white"
							title="Configure prompt"
							on:click={() => promptSelected(prompt)}><Icon icon="ion:plus" /></button
						>
					{/if}
				</div>
			{/each}
		</div>
	{:else if loading}
		<div class="flex justify-center">
			<ProgressRadial width={'w-10'} stroke={100} />
		</div>
	{:else}
		<p class="text-gray-600">
			No prompts found!<br />Type a word (e.g. "brainstorm") to find related prompts...
		</p>
	{/if}
</div>
