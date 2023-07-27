<script lang="ts">
	import type { Prompt } from '$lib/models/prompts';
	import DesignPreview from './DesignPreview.svelte';
	import FreeFormPreview from './FreeFormPreview.svelte';

	export let prompt: Prompt;
</script>

{#if prompt.promptId !== -1}
	<p>
		{prompt.description}
	</p>
{:else}
	<label class="label">
		<span>Prompt Name*</span>
		<input type="text" class="input" bind:value={prompt.name} />
	</label>
	<label class="label">
		<span>Description</span>
		<textarea
			class="textarea"
			rows="4"
			bind:value={prompt.description}
			name="description"
			placeholder="Describe your prompt here."
		/>
	</label>
{/if}

<label class="label">
	<span>Signifier*</span>
	<textarea
		class="textarea"
		rows="4"
		bind:value={prompt.signifier}
		name="signifier"
		placeholder="Tell the model what it should do. E.g. give me 10 ideas for..."
	/>
</label>

<label class="label">
	<span>Output format</span>
	<textarea
		class="textarea"
		rows="4"
		bind:value={prompt.outputFormat}
		name="output-format"
		placeholder="Specify how the output should be formated. Leave blank if you do not need any formatting."
	/>
</label>

{#if prompt.type.key === 'freeForm'}
	<FreeFormPreview {prompt} />
{:else if prompt.type.key === 'design'}
	<DesignPreview {prompt} />
{/if}
