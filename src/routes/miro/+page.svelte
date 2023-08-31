<script lang="ts">
	import { browser } from '$app/environment';
	import { MiroContext } from '$lib';
	import RunPrompt from '$lib/components/RunPrompt.svelte';

	// Prevent opening the panel if local storage is not accessible
	try {
		window.localStorage.setItem('miro', 'true');
		if (browser) {
			const miro = (window as any).miro;

			miro.board.ui.on('icon:click', async () => {
				await miro.board.ui.openPanel({
					// The content displayed on the panel is fetched from the specified HTML resource
					url: '/miro'
				});
			});

			const context = new MiroContext();
			context.listenToUpdates();
		}
	} catch {}

	// if (browser && $currentPrompts.length > 0) {
	// 	console.log($currentPrompts[0]);
	// 	goto('/miro/run');
	// }
</script>

<!-- <div class="flex flex-col">
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
			</div>
			<p class="italic text-sm">{promptType.description}</p>
		</div>
	{/each}
</div> -->
<RunPrompt />
