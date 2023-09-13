import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';
import { SYSTEM_PROMPTS } from './system-prompts.helper';

export class BrainstormingPrompt extends Prompt {
	public type = BRAINSTORMING_PROMPT_TYPE;
	public scenario?: string;
	public persona?: string;

	constructor(data: PromptData) {
		super(data);
	}

	public toString() {
		return this.generateString({ persona: this.persona, scenario: this.scenario });
	}
}

export const BRAINSTORMING_PROMPT_TYPE: PromptType = {
	name: 'Brainstorming Prompt',
	key: 'brainstorming',
	contextSelectable: true,
	dbQueriesSelectable: false,
	description: 'The goal is to generate many new and creative ideas.',
	systemPrompt: SYSTEM_PROMPTS.brainstorming
};
