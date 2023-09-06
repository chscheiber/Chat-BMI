import type { Prompt } from '$lib';
import type { LlmSettings } from '$lib/models/prompts/api-prompt.model';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';

function createCurrentPrompts() {
	const initialPrompts: Prompt[] = [];
	// if (browser && window.localStorage) {
	// 	initialPrompts = JSON.parse(window.localStorage.getItem('currentPrompts') ?? '[]');
	// }
	const { subscribe, set, update } = writable<Prompt[]>(initialPrompts);

	return {
		subscribe,
		set: (prompt: Prompt) =>
			update((prompts) => {
				// if (browser && window.localStorage)
				// 	window.localStorage.setItem('currentPrompts', JSON.stringify([prompt, ...prompts]));
				return [prompt, ...prompts];
			}),
		reset: () => set([])
	};
}

export const newPrompt = writable<Prompt | null>(null);
export const currentPrompts = createCurrentPrompts();
export const currentContext = writable<string>('');

export const openAISettings: Writable<LlmSettings> = localStorageStore('openAiSettings', {
	key: '',
	model: 'gpt-4',
	streaming: true
});

export const userId = writable<string | null>(null);
