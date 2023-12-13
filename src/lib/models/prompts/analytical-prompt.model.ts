import { Prompt } from './prompt.model';
import type { PromptData, PromptType } from './prompt-types';

export class AnalyticalPrompt extends Prompt {
	public readonly type = ANALYTICAL_PROMPT_TYPE;
	public referencing = true;

	constructor(data: PromptData) {
		super(data);
	}

	public toString(): string {
		return this.generateString();
	}
}

export const ANALYTICAL_PROMPT_TYPE: PromptType = {
	name: 'Analytical Prompt',
	key: 'analytical',
	description: 'Analytical prompt that can be used for knowledge questions.'
};
