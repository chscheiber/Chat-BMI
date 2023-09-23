<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants';
	import { Prompt, PromptFactory, type PromptTypeKey } from '$lib/models';
	import { Conversation } from '$lib/models/prompts/conversation.model';
	import { currentContext, newConversation, newPrompt } from '$lib/store';
	import Icon from '@iconify/svelte';

	$: selectedClass = $currentContext !== '' ? 'variant-filled-success ' : 'variant-filled-tertiary';

	export let signifier = '';
	export let promptType: PromptTypeKey = 'freeForm';
	export let prompt: Prompt | null = null;

	export const configPrompt = () => {
		if (prompt) {
			goto(`${ROUTES.PROMPTS}/${prompt.type.key}/${prompt.promptId}`);
		} else {
			const initializedPrompt = PromptFactory.emptyPrompt(promptType, { signifier });
			newPrompt.set(initializedPrompt);
			goto(`${ROUTES.PROMPTS}/${promptType}/new`);
		}
	};

	export const runPrompt = () => {
		if (!prompt) {
			prompt = PromptFactory.emptyPrompt(promptType, { signifier });
		}
		const conversation = new Conversation({
			prompt: prompt,
			title: prompt.signifier,
			userId: prompt.userId,
			teamId: prompt.teamId
		});
		newConversation.set(conversation);
		goto(ROUTES.NEW_CONVERSATION);
	};
</script>

<div class="flex flex-col !p-0">
	<button
		class="flex items-center justify-center variant-filled-secondary grow-[3]"
		title="Configure prompt"
		on:click={configPrompt}><Icon icon="grommet-icons:configure" /></button
	>
	<button
		class="{selectedClass} flex items-center justify-center text-white grow-[4] rounded-br-sm"
		title="Run prompt"
		on:click={runPrompt}
		disabled={!prompt && signifier === ''}><Icon icon="ion:play" /></button
	>
</div>
