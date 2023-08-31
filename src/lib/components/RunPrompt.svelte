<script lang="ts">
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES, PromptFactory, type PromptTypeKey } from '$lib/models';
	import { currentContext, newPrompt } from '$lib/store';
	import Icon from '@iconify/svelte';
	let signifier = '';
	let promptType: PromptTypeKey = 'freeForm';

	$: selectedClass = $currentContext !== '' ? 'variant-filled-success ' : 'variant-filled-warning';

	const createNewPrompt = () => {
		const prompt = PromptFactory.emptyPrompt(promptType, { signifier });
		newPrompt.set(prompt);
		goto(`/miro/prompts/${promptType}/new/preview`);
	};
</script>

<div class="flex flex-col input-group rounded-container-token mt-auto">
	<select class="input" bind:value={promptType}>
		{#each PROMPT_TYPES as promptType}
			<option value={promptType.key}>{promptType.name}</option>
		{/each}
	</select>
	<div class="prompt-group no-pad input-group-divider border-t-[1px] border-r-0 border-inherit">
		<textarea
			class="bg-transparent border-0 flex-1 resize-none"
			bind:value={signifier}
			name="prompt"
			id="prompt"
			placeholder="Write your prompt...
Hint: Select context from the miro board"
			rows="3"
		/>
		<div class="flex flex-col no-pad" style="align-items: stretch;">
			<button
				class="variant-filled-secondary grow-[3] text-[18px]"
				title="Configure prompt"
				on:click={createNewPrompt}><Icon icon="grommet-icons:configure" /></button
			>
			<button
				class="{selectedClass} text-white grow-[4] text-[24px]"
				title="Run prompt"
				disabled={signifier === ''}><Icon icon="gridicons:play" /></button
			>
		</div>
	</div>
</div>

<style>
	.no-pad {
		padding: 0px;
	}

	.prompt-group {
		display: flex;
		align-items: stretch;
	}
</style>
