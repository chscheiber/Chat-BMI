import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class EvaluationPrompt extends Prompt {
	public type = EVALUATION_PROMPT_TYPE;
	public reasoning = true;
	public scenario = '';
	public persona = '';

	constructor(data: PromptData) {
		super(data);
		if (data.persona?.value) this.persona = data.persona.value;
		if (data.scenario?.value) this.scenario = data.scenario.value;
	}

	public toString() {
		return this.generateString({
			reasoning: this.reasoning,
			persona: this.persona,
			scenario: this.scenario
		});
	}
}

export const EVALUATION_PROMPT_TYPE: PromptType = {
	name: 'Evaluation Prompt',
	key: 'evaluation',
	description: 'These Prompts allow you to evaluate Business Models and their elements.'
};
