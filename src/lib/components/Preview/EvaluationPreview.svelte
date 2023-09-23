<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import type { EvaluationPrompt } from '$lib/models/prompts/evaluation-prompt.model';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let prompt: Prompt;
	const evaluationPrompt = prompt as EvaluationPrompt;
</script>

<div class="flex flex-col gap-y-4">
	<div class="flex">
		<SlideToggle
			name="referencing"
			active="bg-primary-500"
			bind:checked={evaluationPrompt.referencing}>Include references</SlideToggle
		>
	</div>
	<div class="flex">
		<SlideToggle name="reasoning" active="bg-primary-500" bind:checked={evaluationPrompt.reasoning}
			>Let the model add reasoning</SlideToggle
		>
	</div>
</div>
