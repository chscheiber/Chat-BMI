import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt-types';
import { SYSTEM_PROMPTS } from './system-prompts.helper';

export class ActionPrompt extends Prompt {
	public type = ACTION_PROMPT_TYPE;
	public dbQueries?: string[];
	public reasoning?: boolean;

	constructor(data: PromptData) {
		super(data);

		if (!data.elements) return;

		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
		if (parsedElements.reasoning) this.reasoning = parsedElements.reasoning;
	}

	public toString(): string {
		return super.generateString({ reasoning: this.reasoning });
	}
}

export const ACTION_PROMPT_TYPE: PromptType = {
	name: 'Action Prompt',
	key: 'action',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: 'These Prompts allow you to create actionable strategies.',
	systemPrompt: SYSTEM_PROMPTS.action
};
