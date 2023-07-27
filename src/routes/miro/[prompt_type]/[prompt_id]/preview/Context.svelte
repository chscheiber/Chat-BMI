<script lang="ts">
	import { browser } from '$app/environment';
	import type { Prompt } from '$lib';

	if (browser) {
		(window as any).miro.board.ui.on(
			'selection:update',
			async (event: any) => (selection = event.items)
		);
	}

	export let prompt: Prompt;
	console.log(prompt);

	let selection: any[] = [];
	$: stickyNotes = selection.filter((item) => item.type === 'sticky_note');
	// $: frames = selection.filter((item) => item.type === 'frame');
	// $: frameContent = frames[0]?.getChildren() ?? [];
</script>

{#if stickyNotes.length > 0}
	<p class="whitespace-pre-line">
		{stickyNotes
			.map((note) => note.content.replace('<p>', '').replace('</p>', ''))
			.filter((item) => item !== '')
			.join('\n')}
	</p>
{:else}
	<h5 class="h5">No items selected.</h5>
	<p>
		Select frames or sticky notes on your miro board to get started or go to the next page if you do
		not want to use any context.
	</p>
{/if}
