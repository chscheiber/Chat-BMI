<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import { currentContext } from '$lib/store';

	$: prompt.context = $currentContext;
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
