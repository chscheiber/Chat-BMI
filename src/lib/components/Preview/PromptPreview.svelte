<script lang="ts">
	import { PUBLIC_MIRO_ADMIN_ID } from '$env/static/public';
	import type { Prompt } from '$lib/models/prompts';
	import { miroSession } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let prompt: Prompt;
	console.log('PromptPreview', prompt);
</script>

{#if prompt.promptId}
	{#if prompt.description}
		<label class="label">
			<span>Description</span>
			<textarea disabled class="input" value={prompt.description} />
		</label>
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

{#if 'scenario' in prompt}
	<label class="label">
		<span>Imagine the following scenario...</span>
		<textarea
			class="textarea"
			placeholder="Describe a scenario you want the LLM to act in."
			name="scenario"
			rows="4"
			bind:value={prompt.scenario}
		/>
	</label>
{/if}
{#if 'persona' in prompt}
	<label class="label">
		<span>Act as...</span>
		<textarea
			class="textarea"
			placeholder="Describe a persona you want the LLM to immidate."
			name="persona"
			rows="4"
			bind:value={prompt.persona}
		/>
	</label>
{/if}
{#if 'reasoning' in prompt && typeof prompt.reasoning === 'boolean'}
	<div class="flex">
		<SlideToggle
			name="reasoning"
			active="bg-primary-500"
			bind:checked={prompt.reasoning}
			disabled={!['freeForm', 'design'].includes(prompt.type.key)}
			>Let the model add reasoning</SlideToggle
		>
	</div>
{/if}

{#if 'referencing' in prompt && typeof prompt.referencing === 'boolean'}
	<div class="flex">
		<SlideToggle
			name="referencing"
			active="bg-primary-500"
			bind:checked={prompt.referencing}
			disabled={prompt.type.key !== 'freeForm'}>Include references</SlideToggle
		>
	</div>
{/if}

<div class="flex justify-between items-end gap-x-4 pb-4">
	<label class="label">
		<span>Visibility</span>
		<select
			class="input"
			name="visibility"
			bind:value={prompt.visibility}
			disabled={!!prompt.promptId}
		>
			<option value="private">Private</option>
			<option value="team">Team</option>
			<option value="public" disabled={$miroSession?.user !== PUBLIC_MIRO_ADMIN_ID}>Public</option>
		</select>
	</label>
	{#if !prompt.promptId}
		<button type="submit" class="btn variant-filled-secondary">Save Prompt</button>
	{/if}
</div>
