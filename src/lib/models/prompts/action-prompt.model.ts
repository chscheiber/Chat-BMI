import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class ActionPrompt extends Prompt {
	public type = ACTION_PROMPT_TYPE;
	public reasoning = true;

	constructor(data: PromptData) {
		super(data);
	}

	public toString(): string {
		return super.generateString({ reasoning: this.reasoning });
	}
}

export const ACTION_PROMPT_TYPE: PromptType = {
	name: 'Action Prompt',
	key: 'action',
	description: 'These Prompts allow you to create actionable strategies.'
};
