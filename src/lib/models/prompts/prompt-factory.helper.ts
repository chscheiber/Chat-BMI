import { ACTION_PROMPT_TYPE, ActionPrompt } from './action-prompt.model';
import { ANALYTICAL_PROMPT_TYPE, AnalyticalPrompt } from './analytical-prompt.model';
import { BRAINSTORMING_PROMPT_TYPE, BrainstormingPrompt } from './brainstorming-prompt.model';
import { DESIGN_PROMPT_TYPE, DesignPrompt } from './design-prompt.model';
import { EVALUATION_PROMPT_TYPE, EvaluationPrompt } from './evaluation-prompt.model';
import { FREE_FORM_PROMPT_TYPE, FreeFormPrompt } from './free-form-prompt.model';
import type { Prompt } from './prompt.model';
import type { PromptType, PromptTypeKey, PromptData } from './prompt-types';

/**
 * All Prompt Types
 */
export const PROMPT_TYPES: PromptType[] = [
	ACTION_PROMPT_TYPE,
	ANALYTICAL_PROMPT_TYPE,
	BRAINSTORMING_PROMPT_TYPE,
	DESIGN_PROMPT_TYPE,
	EVALUATION_PROMPT_TYPE,
	FREE_FORM_PROMPT_TYPE
];

export class PromptFactory {
	static emptyPrompt(type: PromptTypeKey, data?: Partial<PromptData>): Prompt {
		data = {
			id: 0,
			description: null,
			created_at: null,
			name: 'New Prompt',
			signifier: '',
			elements: {},
			type,
			llm_model_name: null,
			output_format: null,
			persona_id: null,
			scenario_id: null,
			private: false,
			user_id: null,
			...data
		};
		return this.createPrompt(type, data as PromptData);
	}

	static createPrompt(type: PromptTypeKey | PromptTypeKey): Prompt;
	static createPrompt(type: PromptTypeKey | PromptTypeKey, data: PromptData): Prompt;
	static createPrompt(type: PromptTypeKey | PromptTypeKey, data?: PromptData): Prompt {
		if (!PROMPT_TYPES.find((promptType) => '' + promptType.key === type))
			throw new Error(`Prompt type ${type} does not exist.`);

		if (!data) {
			data = {
				id: 0,
				description: null,
				created_at: null,
				name: 'New Prompt',
				signifier: '',
				elements: {},
				type,
				llm_model_name: null,
				output_format: null,
				persona_id: null,
				scenario_id: null,
				private: false,
				user_id: null,
				fts: null,
				team_id: '',
				visibility: 'private'
			};
		}

		switch (type) {
			case 'action':
				return new ActionPrompt(data);
			case 'brainstorming':
				return new BrainstormingPrompt(data);
			case 'design':
				return new DesignPrompt(data);
			case 'freeForm':
				return new FreeFormPrompt(data);
			case 'analytical':
				return new AnalyticalPrompt(data);
			case 'evaluation':
				return new EvaluationPrompt(data);
			default:
				throw new Error(`Prompt type ${type} does not exist.`);
		}
	}
}
