<script lang="ts">
	import { PromptFactory, type Prompt } from '$lib/models/prompts';
	import DesignPreview from './DesignPreview.svelte';
	import FreeFormPreview from './FreeFormPreview.svelte';

	export let prompt: Prompt;

	const savePrompt = async () => {
		try {
			const miro = (window as any).miro();
			const userId = (await miro.board.getUserInfo()).id;
			const res = await fetch('/api/prompts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt, userId })
			});

			if (res.ok && res.body) {
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
{/if}

{#if prompt.promptId === -1}
	<div class="flex justify-end">
		<button class="btn variant-filled-primary" on:click={savePrompt}>Save Prompt</button>
	</div>
{/if}
