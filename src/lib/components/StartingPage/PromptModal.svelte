<script lang="ts">
	import type { Prompt } from '$lib/models';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let parent: any;
	const prompt: Prompt = $modalStore[0].meta.prompt;
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">
			<div class="flex flex-col">
				<span>Prompt details</span>
				<span class="text-sm text-gray-600">{prompt.type.name}</span>
			</div>
		</header>
		<hr />
		<h6 class="h6">Description:</h6>
		<p class="!mt-0">{prompt.description}</p>
		<hr />
		<h6 class="h6">Signifier:</h6>
		<p class="!mt-0">{prompt.signifier}</p>
		<footer class="flex justify-end">
			<button class="btn variant-filled" on:click={parent.onClose}>Close</button>
		</footer>
	</div>
{/if}
