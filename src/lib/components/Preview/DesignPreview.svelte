<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import type { DesignPrompt } from '$lib/models/prompts/design-prompt.model';
	import TextArea from './TextArea.svelte';
	import { PERSONA_PREVIEW, SCENARIO_PREVIEW } from './preview.helper';

	export let prompt: Prompt;
	const designPrompt = prompt as DesignPrompt;
</script>

<TextArea
	label={PERSONA_PREVIEW.label}
	placeholder={PERSONA_PREVIEW.placeholder}
	bind:value={designPrompt.persona}
/>
<TextArea
	label={SCENARIO_PREVIEW.label}
	placeholder={SCENARIO_PREVIEW.placeholder}
	bind:value={designPrompt.scenario}
/>
