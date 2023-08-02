import { browser } from '$app/environment';
import type { Prompt } from '$lib';
import { writable } from 'svelte/store';

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

export const currentPrompts = createCurrentPrompts();

export const openAIKey = writable<string | null>(null);
