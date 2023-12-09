import type { Database } from '$lib/database';
import { PromptFactory, type Prompt, type PromptData, type PromptTypeKey } from './prompts';

export class Collection {
	public readonly id: number;
	public readonly userId: string;
	public readonly teamId: string;
	public title: string;
	public description: string;
	public readonly createdAt: Date;
	public prompts: Prompt[];
	public visibility: 'public' | 'team' | 'private';

	constructor(
		data: Partial<
			CollectionData & {
				prompts: (PromptData & { position: any })[];
			}
		>
	) {
		console.log(data);
		this.id = data.id ?? 0;
		this.title = data.title ?? '';
		this.description = data.description ?? '';
		this.createdAt = new Date(data.created_at ?? Date.now());
		this.userId = data.user_id ?? '';
		this.teamId = data.team_id ?? '';
		this.visibility = (data.visibility as 'public' | 'team' | 'private') ?? 'private';
		console.log(data);
		this.prompts =
			data.prompts
				?.sort((a, b) =>
					a.position && b.position ? a.position[0].position - b.position[0].position : 0
				)
				.map((prompt) => PromptFactory.createPrompt(prompt.type as PromptTypeKey, prompt)) ?? [];
	}
}

export type CollectionData = Database['public']['Tables']['collections']['Row'];
