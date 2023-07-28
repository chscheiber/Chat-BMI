<script lang="ts">
	import type { Prompt, FreeFormPrompt } from '$lib/models/prompts';
	import BooleanInput from './BooleanInput.svelte';
	import TextArea from './TextArea.svelte';
	import { PERSONA_PREVIEW, SCENARIO_PREVIEW } from './preview.helper';

	export let prompt: Prompt;
	const freeFormPrompt = prompt as FreeFormPrompt;
</script>

<TextArea
	label={PERSONA_PREVIEW.label}
	placeholder={PERSONA_PREVIEW.placeholder}
	bind:value={freeFormPrompt.persona}
/>
<TextArea
	label={SCENARIO_PREVIEW.label}
	placeholder={SCENARIO_PREVIEW.placeholder}
	bind:value={freeFormPrompt.scenario}
/>

<div class="flex flex-col gap-y-4">
	<BooleanInput bind:checked={freeFormPrompt.referencing} label="Include references" />
	<BooleanInput bind:checked={freeFormPrompt.reasoning} label="Let the model add reasoning" />
</div>
