<script lang="ts">
	import BackNav from '$lib/components/BackNav.svelte';
	import TextInput from '$lib/components/prompt-elements/TextInput.svelte';
	import { Step, Stepper, focusTrap } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import BoolInput from '$lib/components/prompt-elements/BoolInput.svelte';
	import Context from './Context.svelte';
	import { enhance } from '$app/forms';
	import ArrayInput from '$lib/components/prompt-elements/ArrayInput.svelte';
	import type { TextElement } from '$lib/models/prompt-elements.model';

	export let data: PageData;

	let lastPage = `/miro/${data.params.prompt_type}`;
	let isFocused: boolean = true;

	const populateInputField = (elementKey: string | null) => {
		const userPromptElement = data.userPromptElements?.find(
			(upe) => upe.element_key === elementKey
		);

		if (userPromptElement) {
			return userPromptElement;
		}

		const promptElement = data.promptElements.find((pe) => pe.key === elementKey);

		const fallback: TextElement = {
			element_name: promptElement?.pe_name ?? '',
			element_key: 'none',
			value: ''
		};

		return fallback;
	};

	const useContext = data.promptElements.find((pe) => pe.key === 'context');
	const useQueries = data.promptElements.find((pe) => pe.key === 'db_queries');
</script>

<div class="flex flex-col mb-6">
	<BackNav heading={data.prompt.name} {lastPage} />
	<span class="text-sm">{data.prompt.description ?? 'Lorem Ipsum'}</span>
</div>

{#if useContext}
	<Stepper buttonCompleteType="submit" buttonCompleteLabel="Run Prompt">
		{#if useContext}
			<Step>
				<svelte:fragment slot="header">Select Context</svelte:fragment>
				<Context />
			</Step>
		{/if}
		{#if useQueries && false}
			<Step>
				<svelte:fragment slot="header">DB Queries</svelte:fragment>
				<ArrayInput />
			</Step>
		{/if}
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.append('promptId', data.params.prompt_id);
				formData.append('promptTypeId', '' + data.prompt.type);
			}}
		>
			<Step>
				<svelte:fragment slot="header">Customize Prompt</svelte:fragment>
				{#each data.promptElements as element}
					{#if element.input_type === 'textarea'}
						<TextInput element={populateInputField(element.key)} />
					{:else if element.input_type === 'boolean'}
						<BoolInput element={populateInputField(element.key)} />
					{/if}
				{/each}
			</Step>
		</form>
	</Stepper>
{:else}
	<h4 class="h4">Adjust prompt</h4>
	<form
		method="POST"
		use:enhance={({ formData }) => {
			formData.append('promptId', data.params.prompt_id);
			formData.append('promptTypeId', '' + data.prompt.type);
		}}
	>
		{#each data.promptElements as element}
			{#if element.input_type === 'textarea'}
				<TextInput element={populateInputField(element.key)} />
			{:else if element.input_type === 'boolean'}
				<BoolInput element={populateInputField(element.key)} />
			{/if}
		{/each}
		<div class="flex justify-end mt-2">
			<button class="btn variant-filled">Run prompt</button>
		</div>
	</form>
{/if}
