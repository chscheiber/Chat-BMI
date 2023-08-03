<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import type { EvaluationPrompt } from '$lib/models/prompts/evaluation-prompt.model';
	import BooleanInput from './BooleanInput.svelte';

	export let prompt: Prompt;
	const evaluationPrompt = prompt as EvaluationPrompt;
</script>

<div class="flex flex-col gap-y-4">
	<BooleanInput bind:checked={evaluationPrompt.referencing} label="Include references" />
	<BooleanInput bind:checked={evaluationPrompt.reasoning} label="Let the model add reasoning" />
</div>
