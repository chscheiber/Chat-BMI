<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PROMPT_TYPES } from '$lib';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { currentPrompts } from '../../store';
	import Icon from '@iconify/svelte';

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
			<div class="flex justify-between mb-2">
				<h2 class="h2">{promptType.name}s</h2>
				<button
					type="button"
					class="btn-icon btn-icon-sm variant-filled ms-auto"
					on:click={() => {
						goto(`miro/${promptType.key}`);
					}}><Icon icon="ion:arrow-back" rotate={2} /></button
				>
				<!-- <a class="btn btn-sm variant-filled mt-3" href={`miro/${promptType.key}`}>See Prompts</a> -->
			</div>
			<p class="italic text-sm">{promptType.description}</p>
		</div>
	{/each}
</div>
