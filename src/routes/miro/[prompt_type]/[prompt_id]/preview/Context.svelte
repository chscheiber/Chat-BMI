<script lang="ts">
	import { browser } from '$app/environment';
	import { MiroContext } from '$lib';
	import type { Prompt } from '$lib/models/prompts';

	const context: MiroContext = new MiroContext();
	let contextString = '';
	if (browser) {
		(window as any).miro.board.getSelection().then(async (items: any) => {
			contextString = await context.updateItems(items);
		});

		(window as any).miro.board.ui.on('selection:update', async (event: any) => {
			contextString = await context.updateItems(event?.items);
		});
	}
	$: prompt.context = contextString;
	export let prompt: Prompt;
</script>

{#if prompt.context !== ''}
	<p class="whitespace-pre-line">
		{prompt.context}
	</p>
{:else}
	<h5 class="h5">No items selected.</h5>
	<p>
		Select frames or sticky notes on your miro board to get started or go to the next page if you do
		not want to use any context.
	</p>
{/if}
