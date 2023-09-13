<script lang="ts">
	import { browser } from '$app/environment';
	import { MiroContext, Prompt } from '$lib';
	import PromptFinder from '$lib/components/StartingPage/PromptFinder.svelte';
	import RunPrompt from '$lib/components/RunPrompt.svelte';
	import { MiroBoard } from '$lib/models/miro-board.model';
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	export let data;
	// Prevent opening the panel if local storage is not accessible
	try {
		window.localStorage.setItem('miro', 'true');
		if (browser) {
			MiroBoard.registerApp();
			const context = new MiroContext();
			context.listenToUpdates();
		}
	} catch {}

	const conversations = data.conversations;
</script>

<div class="flex flex-col flex-1 justify-between">
	<ConversationHistory {conversations} />
	<div class="flex flex-col gap-y-4 mt-auto">
		<PromptFinder />
		<RunPrompt />
	</div>
</div>
