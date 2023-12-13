import type { PromptData, PromptType } from './prompt-types';

export abstract class Prompt {
	public promptId: number;
	public userId = '';
	public teamId = '';
	public visibility: PromptVisibility = 'private';
	public created: Date;
	public name: string;
	public description?: string;
	public signifier: string;
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
	}

	protected generateString(options?: TextOptions): string {
		let text = this.signifier + '\n';
		if (this.context) text += `\nContext:\n"${this.context}"\n`;
		if (!options) return text;
		if (options.persona) text += `\nAct as this persona:\n"${options.persona}"\n`;
		if (options.scenario) text += `\nImagine the following scenario:\n"${options.scenario}"\n`;
		if (options.reasoning) text += `\nLet's think step by step!\n`;
		if (options.referencing)
			text += `\nAlways state the source where you got the answer from as detailed as possible using the following syntax: "SOURCE: <<placeholder for source>>". State the source directly after each facts, details, or information in the answer.\n`;
		return text;
	}

	public abstract toString(): string;
}

export const promptVisibilities = ['public', 'team', 'private'] as const;
export type PromptVisibility = (typeof promptVisibilities)[number];

type TextOptions = {
	reasoning?: boolean;
	referencing?: boolean;
	persona?: string;
	scenario?: string;
};
