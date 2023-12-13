import type { Database } from '$lib/database';
type Tables = Database['public']['Tables'];
export type ScenarioData = Tables['scenarios']['Row'];
export type PersonaData = Tables['personas']['Row'];
export type PromptData = Tables['prompts']['Row'] & {
	persona: PersonaData | null;
	scenario: ScenarioData | null;
};

export type PropmtQuery = PromptData & {
	scenario: ScenarioData;
	persona: PersonaData;
};

export type PromptType = {
	readonly key: PromptTypeKey;
	readonly name: string;
	readonly description: string;
};

export const PromptTypeKeys = [
	'analytical',
	'brainstorming',
	'design',
	'evaluation',
	'action',
	'freeForm'
] as const;
export type PromptTypeKey = (typeof PromptTypeKeys)[number];

export const PromptElements = [
	'signifier',
	'outputFormat',
	'persona',
	'scenario',
	'reasoning',
	'referencing'
] as const;
export type PromptElement = (typeof PromptElements)[number];
