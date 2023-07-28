import type { Prompt } from '$lib';
import { writable } from 'svelte/store';

function createCurrentPrompts() {
	const { subscribe, set, update } = writable<Prompt[]>([]);

	return {
		subscribe,
		set: (prompt: Prompt) => update((prompts) => [prompt, ...prompts]),
		reset: () => set([])
	};
}

export const currentPrompts = createCurrentPrompts();
