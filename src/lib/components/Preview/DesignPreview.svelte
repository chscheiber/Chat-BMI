<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import type { DesignPrompt } from '$lib/models/prompts/design-prompt.model';
	import TextArea from './TextArea.svelte';

	export let prompt: Prompt;
	const designPrompt = prompt as DesignPrompt;
</script>

<TextArea label="Persona" placeholder="Describe a persona." bind:value={designPrompt.persona} />
<TextArea label="Scenario" placeholder="Describe a scenario." bind:value={designPrompt.scenario} />
