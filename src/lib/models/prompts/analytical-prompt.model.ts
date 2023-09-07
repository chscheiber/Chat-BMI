import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt-types';
import { SYSTEM_PROMPTS } from './system-prompts.helper';

export class AnalyticalPrompt extends Prompt {
	public readonly type = ANALYTICAL_PROMPT_TYPE;
	public dbQueries?: string[];
	public referencing = true;

	constructor(data: PromptData) {
		super(data);
		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
		if (parsedElements.referencing) this.referencing = parsedElements.referencing;
	}

	public toString(): string {
		return this.generateString();
	}
}

export const ANALYTICAL_PROMPT_TYPE: PromptType = {
	name: 'Analytical Prompt',
	key: 'analytical',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: 'Analytical prompt that can be used for knowledge questions.',
	systemPrompt: SYSTEM_PROMPTS.analytical
};
