<script lang="ts">
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES, PromptFactory, type PromptTypeKey } from '$lib/models';
	import { currentContext, newPrompt } from '$lib/store';
	import RunConfigButtons from './RunConfigButtons.svelte';
	let signifier = '';
	let promptType: PromptTypeKey = 'freeForm';

	$: selectedClass = $currentContext !== '' ? 'variant-filled-success ' : 'variant-filled-warning';

	const createNewPrompt = () => {
		const prompt = PromptFactory.emptyPrompt(promptType, { signifier });
		newPrompt.set(prompt);
		goto(`/miro/prompts/${promptType}/new/preview`);
	};
</script>

<div class="flex flex-col input-group rounded-container-token">
	<select class="input" bind:value={promptType}>
		{#each PROMPT_TYPES as promptType}
			<option value={promptType.key}>{promptType.name}</option>
		{/each}
	</select>
	<div class="prompt-group !p-0 input-group-divider border-t-[1px] border-r-0 border-inherit">
		<textarea
			class="bg-transparent border-0 flex-1 resize-none"
			bind:value={signifier}
			name="prompt"
			id="prompt"
			placeholder="Write your prompt...
Hint: Select context from the miro board"
			rows="3"
		/>
		<RunConfigButtons {signifier} {promptType} />
	</div>
</div>

<style>
	.prompt-group {
		display: flex;
		align-items: stretch;
	}
</style>
