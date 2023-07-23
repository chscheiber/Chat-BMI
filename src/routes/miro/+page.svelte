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

	const runPrompt = async (index: number) => {
		alert(data.prompts[index].name);
	};
</script>

{#each data.prompts as prompt, i}
	<div class="flex flex-col pb-3">
		<h1>{prompt.name}</h1>
		<span>{prompt.signifier}</span>
		<div>
			<button type="button" class="btn variant-filled" on:click={() => runPrompt(i)}
				>Run Prompt</button
			>
		</div>
	</div>
{/each}
