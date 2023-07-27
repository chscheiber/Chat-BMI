<script lang="ts">
	import { browser } from '$app/environment';

	if (browser) {
		(window as any).miro.board.ui.on(
			'selection:update',
			async (event: any) => (selection = event.items)
		);
	}
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
{/if}
