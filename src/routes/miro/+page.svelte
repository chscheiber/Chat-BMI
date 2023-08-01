<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES } from '$lib';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { currentPrompts } from '../../store';

	if (browser) {
		const miro = (window as any).miro;

		miro.board.ui.on('icon:click', async () => {
			await miro.board.ui.openPanel({
				// The content displayed on the panel is fetched from the specified HTML resource
				url: '/miro'
			});
		});
	}

	// if (browser && $currentPrompts.length > 0) {
	// 	console.log($currentPrompts[0]);
	// 	goto('/miro/run');
	// }
</script>

<div class="flex flex-col">
	{#each PROMPT_TYPES as promptType}
		<div class="mb-3 pb-3 border-b-[1px] border-b-black">
			<h2 class="h2">{promptType.name}s</h2>
			<p class="italic text-sm">{promptType.description}</p>
			<a class="btn btn-sm variant-filled mt-3" href={`miro/${promptType.key}`}>See Prompts</a>
		</div>
	{/each}
</div>
