import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class BrainstormingPrompt extends Prompt {
	public type = BRAINSTORMING_PROMPT_TYPE;
	public scenario = '';
	public persona = '';

	constructor(data: PromptData) {
		super(data);
		if (data.persona?.value) this.persona = data.persona.value;
		if (data.scenario?.value) this.scenario = data.scenario.value;
	}

	public toString() {
		return this.generateString({ persona: this.persona, scenario: this.scenario });
	}
}

export const BRAINSTORMING_PROMPT_TYPE: PromptType = {
	name: 'Brainstorming Prompt',
	key: 'brainstorming',
	description: 'The goal is to generate many new and creative ideas.'
};
