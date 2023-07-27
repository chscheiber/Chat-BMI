import { PromptBuilder } from '$lib/models/prompt-elements.model';
import { derived, writable } from 'svelte/store';

// function createPrompts() {
// 	const { subscribe, set, update } = writable<Prompt[]>([]);

// 	return {
// 		subscribe,
// 		play: (prompt: Prompt) => update((prompts) => [...prompts, prompt]),
// 		reset: () => set([])
// 	};
// }

// export const executedPrompts = createPrompts();
// export const latestPrompt = derived(executedPrompts, ($prompt) =>
// 	$prompt.length > 0 ? $prompt[$prompt.length - 1] : null
// );
