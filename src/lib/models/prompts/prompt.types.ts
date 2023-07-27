import type { Database } from '$lib/database.types';
type Tables = Database['public']['Tables'];
export type PromptData = Tables['prompts']['Row'];
export type ScenarioData = Tables['scenarios']['Row'];
export type PersonaData = Tables['personas']['Row'];

export type PropmtQuery = PromptData & {
	scenario: ScenarioData;
	persona: PersonaData;
};

export type PromptType = {
	readonly key: PromptTypeKey;
	readonly name: string;
	readonly description: string;
	readonly typeSignifier: string;
	readonly contextSelectable: boolean;
	readonly dbQueriesSelectable: boolean;
	// readonly render: Record<PromptElement, PROMPT_INPUT_ELEMENTS | null>;
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

export type AdditionalPromptElements = {
	db_queries?: string[];
	reasoning?: boolean;
	referencing?: boolean;
};
