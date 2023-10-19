<script lang="ts">
	import { browser } from '$app/environment';
	import { MiroContext, Prompt } from '$lib';
	import PromptFinder from '$lib/components/StartingPage/PromptFinder.svelte';
	import RunPrompt from '$lib/components/RunPrompt.svelte';
	import { MiroBoard } from '$lib/models/miro-board.model';
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	export let data;

	if (browser) {
		MiroBoard.registerApp();
		const context = new MiroContext();
		context.listenToUpdates();
	}

	const conversations = data.conversations;
</script>

<div class="flex flex-col flex-1 justify-end gap-y-4 h-[100%]">
	<div class="flex flex-col gap-y-4 overflow-y-auto">
		<ConversationHistory {conversations} />
		<PromptFinder options={{ showRunConfigButtons: true }} />
	</div>
	<div class="mt-auto">
		<RunPrompt />
	</div>
</div>
