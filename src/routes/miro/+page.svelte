<script lang="ts">
	import { browser } from '$app/environment';
	import { Collection, MiroContext, Prompt, ROUTES } from '$lib';
	import PromptFinder from '$lib/components/StartingPage/PromptFinder.svelte';
	import RunPrompt from '$lib/components/RunPrompt.svelte';
	import { MiroBoard } from '$lib/models/miro-board.model';
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="card-soft p-4 flex items-center justify-start gap-4 hover:cursor-pointer !bg-success-500"
			on:click={() => goto(ROUTES.COLLECTIONS + '/17')}
		>
			<Icon icon="bi:collection" class="text-primary-800" style="font-size: 22px;" />
			<h4 class="h4 text-primary-800"><strong>Evaluation Collection</strong></h4>
		</div>
		<ConversationHistory {conversations} />
		<PromptFinder options={{ showRunConfigButtons: true }} />
	</div>
	<div class="mt-auto">
		<RunPrompt />
	</div>
</div>
