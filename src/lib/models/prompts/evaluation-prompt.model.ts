import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt.types';
import { SYSTEM_PROMPTS } from './system-prompts.helper';

export class EvaluationPrompt extends Prompt {
	public type = EVALUATION_PROMPT_TYPE;
	public dbQueries?: string[];
	public reasoning?: boolean;
	public referencing?: boolean;

	constructor(data: PromptData) {
		super(data);

		if (!data.elements) return;

		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
		if (parsedElements.reasoning) this.reasoning = parsedElements.reasoning;
		if (parsedElements.referencing) this.referencing = parsedElements.referencing;
	}
}

export const EVALUATION_PROMPT_TYPE: PromptType = {
	name: 'Evaluation Prompt',
	key: 'evaluation',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: 'These Prompts allow you to evaluate Business Models and their elements.',
	systemPrompt: SYSTEM_PROMPTS.evaluation
};
