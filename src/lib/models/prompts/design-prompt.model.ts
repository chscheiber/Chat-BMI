import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt-types';
import { SYSTEM_PROMPTS } from './system-prompts.helper';

export class DesignPrompt extends Prompt {
	public type = DESIGN_PROMPT_TYPE;
	public dbQueries?: string[];
	public scenario?: string;
	public persona?: string;

	constructor(data: PromptData) {
		super(data);

		if (!data.elements) return;

		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
	}
}

export const DESIGN_PROMPT_TYPE: PromptType = {
	name: 'Design Prompt',
	key: 'design',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: `The design prompt encourages experimental and visual thinking, interaction with ideas, and requires reasoning for assessing design alternatives.`,
	systemPrompt: SYSTEM_PROMPTS.design
};
