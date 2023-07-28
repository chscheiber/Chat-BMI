import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt.types';

export class FreeFormPrompt extends Prompt {
	public type = FREE_FORM_PROMPT_TYPE;
	public dbQueries?: string[];
	public reasoning?: boolean;
	public referencing?: boolean;
	public scenario?: string;
	public persona?: string;

	constructor(data: PromptData) {
		super(data);

		if (!data.elements) return;

		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
		if (parsedElements.reasoning) this.reasoning = parsedElements.reasoning;
		if (parsedElements.referencing) this.referencing = parsedElements.referencing;
	}
}

export const FREE_FORM_PROMPT_TYPE: PromptType = {
	name: 'Free Form Prompt',
	key: 'freeForm',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: 'This Prompt allows you to use all elements as you wish.',
	typeSignifier:
		'You are Business Model GPT, a professional and helpful GPT that assists in Business Model Innovation.'
	// render: {
	// 	signifier: PROMPT_INPUT_ELEMENTS.TEXTAREA,
	// 	outputFormat: PROMPT_INPUT_ELEMENTS.TEXTAREA,
	// 	persona: PROMPT_INPUT_ELEMENTS.TEXTAREA,
	// 	reasoning: PROMPT_INPUT_ELEMENTS.BOOLEAN,
	// 	referencing: PROMPT_INPUT_ELEMENTS.BOOLEAN,
	// 	scenario: PROMPT_INPUT_ELEMENTS.TEXTAREA
	// }
};
