<script lang="ts">
	import { PUBLIC_MIRO_ADMIN_ID } from '$env/static/public';
	import type { Prompt } from '$lib/models/prompts';
	import { miroSession } from '$lib/store';
	import DesignPreview from './DesignPreview.svelte';
	import EvaluationPreview from './EvaluationPreview.svelte';
	import FreeFormPreview from './FreeFormPreview.svelte';

	export let prompt: Prompt;
</script>

{#if prompt.promptId !== -1}
	{#if prompt.description}
		<p>
			{prompt.description}
		</p>
	{/if}
{:else}
	<input type="hidden" name="type" value={prompt.type.key} />
	<input type="hidden" name="userId" value={$miroSession?.user} />
	<input type="hidden" name="teamId" value={$miroSession?.team} />

	<label class="label">
		<span>Prompt Name*</span>
		<input type="text" class="input" name="name" required bind:value={prompt.name} />
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
	<span>Prompt*</span>
	<textarea
		class="textarea"
		rows="4"
		bind:value={prompt.signifier}
		name="signifier"
		required
		placeholder="Tell the model what it should do. E.g. give me 10 ideas for..."
	/>
</label>

{#if prompt.type.key === 'freeForm'}
	<FreeFormPreview bind:prompt />
{:else if prompt.type.key === 'design'}
	<DesignPreview bind:prompt />
{:else if prompt.type.key === 'evaluation'}
	<EvaluationPreview bind:prompt />
{/if}

<div class="flex items-end gap-x-4 pb-4">
	<label class="label">
		<span>Visibility</span>
		<select
			class="input"
			name="visibility"
			bind:value={prompt.visibility}
			disabled={prompt.promptId !== -1}
		>
			<option value="private">Private</option>
			<option value="team">Team</option>
			<option value="public" disabled={$miroSession?.user !== PUBLIC_MIRO_ADMIN_ID}>Public</option>
		</select>
	</label>
	<button type="submit" class="btn variant-filled-primary">Save Prompt</button>
</div>
