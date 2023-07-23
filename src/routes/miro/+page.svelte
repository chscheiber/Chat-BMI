<script lang="ts">
	import { browser } from '$app/environment';
	export let data;

	if (browser) {
		const miro = (window as any).miro;

		miro.board.ui.on('icon:click', async () => {
			await miro.board.ui.openPanel({
				// The content displayed on the panel is fetched from the specified HTML resource
				url: '/miro'
			});
		});
	}
</script>

<div class="flex flex-col overflow-y-scroll max-h-[98vh]">
	{#each data.promptTypes as promptType}
		<div class="mb-2 pb-2 border-b-2 border-b-black">
			<h2 class="h2">{promptType.name}s</h2>
			<p class="italic">{promptType.description}</p>
			<a class="btn variant-filled mt-2" href={`miro/${promptType.type}`}>See Prompts</a>
		</div>
	{/each}
</div>
