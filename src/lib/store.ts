import type { Prompt } from '$lib';
import type { LlmSettings } from '$lib/models/prompts/api-prompt.model';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';
import type { MiroSession } from '../routes/miro/types';
import type { Conversation } from './models/prompts/conversation.model';

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
export const newConversation = writable<Conversation | null>(null);
export const currentContext = writable<string>('');
export const loading = writable<boolean>(false);

export const openAISettings: Writable<LlmSettings> = localStorageStore('openAiSettings', {
	key: '',
	model: 'gpt-3.5-turbo',
	streaming: true
});

export const miroSession = writable<MiroSession | null>(null);
