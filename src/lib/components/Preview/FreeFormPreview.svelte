<script lang="ts">
	import type { Prompt, FreeFormPrompt } from '$lib/models/prompts';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { PERSONA_PREVIEW, SCENARIO_PREVIEW } from './preview.helper';

	export let prompt: Prompt;
	const freeFormPrompt = prompt as FreeFormPrompt;
</script>

<label class="label">
	<span>{PERSONA_PREVIEW.label}</span>
	<textarea
		class="textarea"
		placeholder={PERSONA_PREVIEW.placeholder}
		name="persona"
		rows="4"
		bind:value={freeFormPrompt.persona}
	/>
</label>
<label class="label">
	<span>{SCENARIO_PREVIEW.label}</span>
	<textarea
		class="textarea"
		placeholder={SCENARIO_PREVIEW.placeholder}
		name="scenario"
		rows="4"
		bind:value={freeFormPrompt.scenario}
	/>
</label>

<div class="flex flex-col gap-y-4">
	<div class="flex">
		<SlideToggle
			name="referencing"
			active="bg-primary-500"
			bind:checked={freeFormPrompt.referencing}>Include references</SlideToggle
		>
	</div>
	<div class="flex">
		<SlideToggle name="reasoning" active="bg-primary-500" bind:checked={freeFormPrompt.reasoning}
			>Let the model add reasoning</SlideToggle
		>
	</div>
</div>
