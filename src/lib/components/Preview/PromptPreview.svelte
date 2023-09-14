<script lang="ts">
	import { PUBLIC_MIRO_ADMIN_ID } from '$env/static/public';
	import { PromptFactory, type Prompt } from '$lib/models/prompts';
	import { miroSession } from '$lib/store';
	import DesignPreview from './DesignPreview.svelte';
	import EvaluationPreview from './EvaluationPreview.svelte';
	import FreeFormPreview from './FreeFormPreview.svelte';

	export let prompt: Prompt;

	const savePrompt = async () => {
		try {
			if ($miroSession) {
				prompt.userId = $miroSession.user;
				prompt.teamId = $miroSession.team;
			}
			const res = await fetch('/api/prompts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt })
			});

			if (res?.ok) {
				const data = await res.json();
				prompt = PromptFactory.createPrompt(data.type, data);
			} else {
				alert('Failed to save prompt.');
			}
		} catch (err) {
			alert('Failed to save prompt.');
		}
	};
</script>

{#if prompt.promptId !== -1}
	{#if prompt.description}
		<p>
			{prompt.description}
		</p>
	{/if}
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
	<span>Prompt*</span>
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
	<FreeFormPreview bind:prompt />
{:else if prompt.type.key === 'design'}
	<DesignPreview bind:prompt />
{:else if prompt.type.key === 'evaluation'}
	<EvaluationPreview bind:prompt />
{/if}

<div class="flex items-end gap-x-4 pb-4">
	<label class="label">
		<span>Visibility</span>
		<select class="input" bind:value={prompt.visibility} disabled={prompt.promptId !== -1}>
			<option value="private">Private</option>
			<option value="team">Team</option>
			<option value="public" disabled={$miroSession?.user !== PUBLIC_MIRO_ADMIN_ID}>Public</option>
		</select>
	</label>

	{#if prompt.promptId === -1}
		<div class="flex justify-end">
			<button class="btn variant-filled-primary" on:click={savePrompt}>Save Prompt</button>
		</div>
	{/if}
</div>
