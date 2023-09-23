<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import type { DesignPrompt } from '$lib/models/prompts/design-prompt.model';
	import { PERSONA_PREVIEW, SCENARIO_PREVIEW } from './preview.helper';

	export let prompt: Prompt;
	const designPrompt = prompt as DesignPrompt;
</script>

<label class="label">
	<span>{PERSONA_PREVIEW.label}</span>
	<textarea
		class="textarea"
		placeholder={PERSONA_PREVIEW.placeholder}
		name="persona"
		rows="4"
		bind:value={designPrompt.persona}
	/>
</label>
<label class="label">
	<span>{SCENARIO_PREVIEW.label}</span>
	<textarea
		class="textarea"
		placeholder={SCENARIO_PREVIEW.placeholder}
		name="scenario"
		rows="4"
		bind:value={designPrompt.scenario}
	/>
</label>
