<script lang="ts">
	import { browser } from '$app/environment';
	import { MiroContext, Prompt } from '$lib';
	import PromptFinder from '$lib/components/PromptFinder/PromptFinder.svelte';
	import RunPrompt from '$lib/components/RunPrompt.svelte';
	import { MiroBoard } from '$lib/models/miro-board.model';

	// Prevent opening the panel if local storage is not accessible
	try {
		window.localStorage.setItem('miro', 'true');
		if (browser) {
			MiroBoard.registerApp();
			const context = new MiroContext();
			context.listenToUpdates();
		}
	} catch {}
</script>

<div class="flex flex-col flex-1 justify-between">
	<div class="flex flex-col gap-y-4 mt-auto">
		<PromptFinder />
		<RunPrompt />
	</div>
</div>
