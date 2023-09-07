import type { PromptData, PromptType } from './prompt-types';
import { PUBLIC_DEFAULT_LLM_MODEL } from '$env/static/public';

export abstract class Prompt {
	public promptId: number;
	public userId = -1;
	public teamId = -1;
	public visibility: PromptVisibility = 'private';
	public created: Date;
	public name: string;
	public description?: string;
	public signifier: string;
	public outputFormat?: string;
	public llmModelName = PUBLIC_DEFAULT_LLM_MODEL;
	public context: string | null = null;
	public abstract readonly type: PromptType;

	constructor(data: PromptData) {
		this.promptId = data.id;
		if (data.user_id) this.userId = data.user_id;
		if (data.team_id) this.teamId = data.team_id;
		if (data.visibility) this.visibility = data.visibility as PromptVisibility;
		this.created = data.created_at ? new Date(data.created_at) : new Date();
		this.name = data.name;
		if (data.description) this.description = data.description;
		this.signifier = data.signifier;
		if (data.output_format) this.outputFormat = data.output_format;
		if (data.llm_model_name) this.llmModelName = data.llm_model_name;
	}

	protected generateString(options?: TextOptions): string {
		let text = this.signifier + '\n';
		if (this.context) text += `Context:\n"${this.context}"\n`;
		if (!options) return text;
		if (options.persona) text += `Act as this persona:\n"${options.persona}"\n`;
		if (options.scenario) text += `Imagine the following scenario:\n"${options.scenario}"\n`;
		if (options.reasoning) text += 'Important: Think step by step!\n';
		return text;
	}

	public abstract toString(): string;
}

export const promptVisibilities = ['public', 'team', 'private'] as const;
export type PromptVisibility = (typeof promptVisibilities)[number];

type TextOptions = {
	reasoning?: boolean;
	persona?: string;
	scenario?: string;
};
