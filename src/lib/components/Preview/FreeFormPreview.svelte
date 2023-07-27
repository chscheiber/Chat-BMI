<script lang="ts">
	import type { Prompt, FreeFormPrompt } from '$lib/models/prompts';
	import BooleanInput from './BooleanInput.svelte';
	import TextArea from './TextArea.svelte';

	export let prompt: Prompt;
	const freeFormPrompt = prompt as FreeFormPrompt;
</script>

<TextArea label="Persona" placeholder="Describe a persona." bind:value={freeFormPrompt.persona} />
<TextArea
	label="Scenario"
	placeholder="Describe a scenario."
	bind:value={freeFormPrompt.scenario}
/>

<div class="flex flex-col gap-y-4">
	<BooleanInput bind:checked={freeFormPrompt.referencing} label="Include references" />
	<BooleanInput bind:checked={freeFormPrompt.reasoning} label="Let the model add reasoning" />
</div>
