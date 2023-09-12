<script lang="ts">
	import { PromptFactory, type Prompt, type PromptData, type PromptTypeKey } from '$lib/models';
	import { ProgressRadial, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import RunConfigButtons from '../RunConfigButtons.svelte';
	import { miroSession } from '$lib/store';

	let prompts: Prompt[] = [];
	let searchValue = '';

	const modalStore = getModalStore();

	const triggerModal = (prompt: Prompt) => {
		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: prompt.name,
			body: `<p class="italic pb-4">${prompt.description}</p><hr/><p class="pt-4">${prompt.signifier}</p>`,
			buttonTextCancel: 'Done'
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
</script>

<div class="card p-4">
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
				<div
					class="grid grid-cols-[minmax(0px,_1fr)_48px] gap-4 input-group input-group-divider rounded-container-token hover:cursor-pointer"
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="!block p-2" on:click={() => triggerModal(prompt)}>
						<h5 class="h5 whitespace-nowrap overflow-hidden text-ellipsis w-[210px]">
							{prompt.name}
						</h5>
						<p class="italic whitespace-nowrap overflow-hidden text-ellipsis w-[210px]">
							{prompt.signifier}
						</p>
					</div>
					<RunConfigButtons {prompt} />
				</div>
			{/each}
		</div>
	{:else if loading}
		<div class="flex justify-center">
			<ProgressRadial width={'w-10'} stroke={100} />
		</div>
	{:else}
		<p class="text-gray-500">No prompts found<br />Type at least 3 characters to find prompts...</p>
	{/if}
</div>
