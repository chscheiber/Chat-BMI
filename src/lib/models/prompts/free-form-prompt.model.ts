import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class FreeFormPrompt extends Prompt {
	public type = FREE_FORM_PROMPT_TYPE;
	public reasoning = false;
	public referencing = false;
	public scenario = '';
	public persona = '';

	constructor(data: PromptData) {
		super(data);
		this.reasoning = data.reasoning ?? false;
		this.referencing = data.referencing ?? false;
		this.scenario = data.scenario?.value ?? '';
		this.persona = data.persona?.value ?? '';
	}

	public toString() {
		return this.generateString({
			reasoning: this.reasoning,
			referencing: this.referencing,
			persona: this.persona,
			scenario: this.scenario
		});
	}
}

export const FREE_FORM_PROMPT_TYPE: PromptType = {
	name: 'Free Form Prompt',
	key: 'freeForm',
	description: 'This Prompt allows you to use all elements as you wish.'
};
