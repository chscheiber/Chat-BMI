<script lang="ts">
	import { PROMPT_TYPES, type PromptTypeKey } from '$lib/models';
	import RunConfigButtons from './RunConfigButtons.svelte';
	let signifier = '';
	let promptType: PromptTypeKey = 'freeForm';
</script>

<div class="flex flex-col input-group rounded-container-token">
	<select class="input" bind:value={promptType}>
		{#each PROMPT_TYPES as promptType}
			<option value={promptType.key}>{promptType.name}</option>
		{/each}
	</select>
	<div class="prompt-group !p-0 input-group-divider border-t-[1px] border-r-0 border-inherit">
		<textarea
			class="bg-transparent border-0 flex-1 resize-none"
			bind:value={signifier}
			name="prompt"
			id="prompt"
			placeholder="Write your prompt here...
Hint: Select items from the miro board to provide context"
			rows="3"
		/>
		<RunConfigButtons {signifier} {promptType} />
	</div>
</div>

<style>
	.prompt-group {
		display: flex;
		align-items: stretch;
	}
</style>
