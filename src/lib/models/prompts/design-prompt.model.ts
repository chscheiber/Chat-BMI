import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class DesignPrompt extends Prompt {
	public type = DESIGN_PROMPT_TYPE;
	public scenario = '';
	public persona = '';
	public reasoning = false;

	constructor(data: PromptData) {
		super(data);

		if (data.scenario?.value) this.scenario = data.scenario.value;
		if (data.persona?.value) this.persona = data.persona.value;
		this.reasoning = data.reasoning ?? false;
	}

	public toString(): string {
		return super.generateString({
			persona: this.persona,
			scenario: this.scenario,
			reasoning: this.reasoning
		});
	}
}

export const DESIGN_PROMPT_TYPE: PromptType = {
	name: 'Design Prompt',
	key: 'design',
	description: `The design prompt encourages experimental and visual thinking, interaction with ideas, and requires reasoning for assessing design alternatives.`
};
