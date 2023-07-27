import { Prompt } from './prompt.model';
import type { PromptData, AdditionalPromptElements, PromptType } from './prompt.types';

export class AnalyticalPrompt extends Prompt {
	public readonly type = ANALYTICAL_PROMPT_TYPE;
	public context?: string;
	public dbQueries?: string[];
	public referencing = true;

	constructor(data: PromptData) {
		super(data);
		const parsedElements = data.elements?.valueOf() as AdditionalPromptElements;
		if (parsedElements.db_queries) this.dbQueries = parsedElements.db_queries;
		if (parsedElements.referencing) this.referencing = parsedElements.referencing;
	}
}

export const ANALYTICAL_PROMPT_TYPE: PromptType = {
	name: 'Analytical Prompt',
	key: 'analytical',
	contextSelectable: true,
	dbQueriesSelectable: true,
	description: 'Analytical prompt that can be used for knowledge questions.',
	typeSignifier: `Given the following extracted parts of relevant documents and a question, create a final answer with references (SOURCES).
		If you don't know the answer, just say that you don't know. Don't try to make up an answer.
		ALWAYS return a (SOURCES) part in your answer.`
	// render: {
	// 	signifier: PROMPT_INPUT_ELEMENTS.TEXTAREA,
	// 	outputFormat: PROMPT_INPUT_ELEMENTS.TEXTAREA,
	// 	persona: null,
	// 	reasoning: null,
	// 	referencing: PROMPT_INPUT_ELEMENTS.BOOLEAN,
	// 	scenario: null
	// }
};
