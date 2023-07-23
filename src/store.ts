import type { Prompt } from '$lib';
import { derived, writable } from 'svelte/store';

function createPrompts() {
	const { subscribe, set, update } = writable<Prompt[]>([]);

	return {
		subscribe,
		// latest: derived(subscribe, ($prompt) => $prompt[$prompt.length - 1]),
		play: (prompt: Prompt) => update((prompts) => [...prompts, prompt]),
		reset: () => set([])
	};
}

export const executedPrompts = createPrompts();
export const latestPrompt = derived(executedPrompts, ($prompt) => $prompt[$prompt.length - 1]);

export const heading = writable<string>('');
