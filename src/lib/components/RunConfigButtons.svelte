<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants';
	import { Prompt, PromptFactory, type PromptTypeKey } from '$lib/models';
	import { currentContext, currentPrompts, newPrompt } from '$lib/store';
	import Icon from '@iconify/svelte';

	$: selectedClass = $currentContext !== '' ? 'variant-filled-success ' : 'variant-filled-tertiary';

	export let signifier = '';
	export let promptType: PromptTypeKey = 'freeForm';
	export let prompt: Prompt | null = null;
	const configPrompt = () => {
		console.log(prompt);
		if (prompt) {
			goto(`/miro/prompts/${prompt.type.key}/${prompt.promptId}/preview`);
		} else {
			const initializedPrompt = PromptFactory.emptyPrompt(promptType, { signifier });
			newPrompt.set(initializedPrompt);
			goto(`/miro/prompts/${promptType}/new/preview`);
		}
	};

	const runPrompt = () => {
		if (!prompt) {
			prompt = PromptFactory.emptyPrompt(promptType, { signifier });
		}
		currentPrompts.set(prompt);
		goto(ROUTES.NEW_CONVERSATION);
	};
</script>

<div class="flex flex-col !p-0 items-center">
	<button class="variant-filled-secondary grow-[3]" title="Configure prompt" on:click={configPrompt}
		><Icon icon="grommet-icons:configure" /></button
	>
	<button
		class="{selectedClass} text-white grow-[4]"
		title="Run prompt"
		on:click={runPrompt}
		disabled={!prompt && signifier === ''}><Icon icon="ion:play" /></button
	>
</div>
