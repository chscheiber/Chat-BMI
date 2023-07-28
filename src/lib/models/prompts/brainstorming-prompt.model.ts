import { Prompt } from './prompt.model';
import type { PromptType } from './prompt.types';

export class BrainstormingPrompt extends Prompt {
	public type = BRAINSTORMING_PROMPT_TYPE;
	public scenario?: string;
	public persona?: string;
}

export const BRAINSTORMING_PROMPT_TYPE: PromptType = {
	name: 'Brainstorming Prompt',
	key: 'brainstorming',
	contextSelectable: true,
	dbQueriesSelectable: false,
	description:
		'The goal is to generate many new and creative ideas.' +
		'It is where hallucinations are tolerated, creative thinking is encouraged,' +
		'and contextual knowledge is not necessarily required',
	typeSignifier: `You are IdeationGPT, a GPT that helps with brainstorming and creating ideas. 
        Produce outputs that fulfil the following criteria:
        - Novelty:  The output should be novel
        - Diversity: Multiple outputs should focus on different things
        
        Do not include any instructions or reasoning in the output.
        Include only the generated ideas in the output.
        Under no circumstances must anything other then the generated ideas be given in the output.`
};
