<script lang="ts">
	import BackNav from '$lib/components/BackNav.svelte';
	import TextInput from '$lib/components/prompt-elements/TextInput.svelte';
	import { Step, Stepper, focusTrap } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { TextElement } from '$lib/models/prompt-elements.model';
	import BoolInput from '$lib/components/prompt-elements/BoolInput.svelte';

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
			value: ''
		};
		return fallback;
	};
</script>

<div class="flex flex-col mb-6">
	<BackNav heading={data.prompt.name} {lastPage} />
	<span class="text-sm">{data.prompt.description ?? 'Lorem Ipsum'}</span>
</div>
<Stepper>
	<Step>
		<svelte:fragment slot="header">Customize Prompt</svelte:fragment>
		<form use:focusTrap={isFocused}>
			{#each data.promptElements as element}
				{#if element.input_type === 'textarea'}
					<TextInput element={populateInputField(element.key)} />
				{:else if element.input_type === 'boolean'}
					<BoolInput element={populateInputField(element.key)} />
				{/if}
			{/each}
		</form>
	</Step>
	<Step>
		<svelte:fragment slot="header">Select Context</svelte:fragment>
		<h3>Context</h3>
	</Step>
	<Step>
		<svelte:fragment slot="header">Preview</svelte:fragment>
		<h3>Preview</h3>
	</Step>
</Stepper>
