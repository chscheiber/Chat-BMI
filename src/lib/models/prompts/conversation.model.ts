import type { Database } from '$lib/database';
import { Collection, type CollectionData } from '../collection.model';
import type { PromptTypeKey } from './prompt-types';
import { Prompt } from './prompt.model';

export class Conversation {
	public id = 0;
	public prompt?: Prompt;
	public collection?: Collection;
	public messages: Message[] = [];
	public userId = '';
	public teamId = '';
	public createdAt = new Date();
	public lastModified = new Date();
	public title = '';

	constructor(data: Partial<Conversation>) {
		if (data.collection && data.prompt)
			throw new Error('Need to have either a collection or a prompt');

		if (data.id) this.id = data.id;
		if (data.collection) this.collection = data.collection;
		if (data.prompt) this.prompt = data.prompt;
		if (data.messages) this.messages = data.messages;
		if (data.userId) this.userId = data.userId;
		if (data.teamId) this.teamId = data.teamId;
		if (data.createdAt) this.createdAt = data.createdAt;
		if (data.lastModified) this.lastModified = data.lastModified;
		if (data.title) this.title = data.title;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public static fromDb(data: Prompt | ConversationData): Conversation {
		if (data instanceof Prompt) {
			return new Conversation({
				prompt: data,
				title: data.signifier,
				userId: data.userId,
				teamId: data.teamId
			});
		}
		return new Conversation({
			id: data.id,
			title: data.title,
			userId: data.user_id,
			teamId: data.team_id,
			messages: data.messages?.valueOf() as Message[],
			createdAt: new Date(data.created_at),
			lastModified: new Date(data.last_modified),
			collection: data.collections ? new Collection(data.collections) : undefined
		});
	}

	public addMessage(message: Message): void;
	public addMessage(text: string, role: Message['role']): void;
	public addMessage(text: string | Message, role?: Message['role']): void {
		if ((text as Message).role) this.messages.push(text as Message);
		else
			this.messages.push({ text: text as string, role: role ?? 'human', promptType: 'freeForm' });
	}

	public getInitialResponse(): string | null {
		const initialResponse = this.messages.filter((message) => message.role === 'system');
		if (!(initialResponse.length > 0)) {
			return null;
		}
		return initialResponse[0].text;
	}
}

export type Message = {
	text: string;
	role: 'human' | 'system';
	promptType: PromptTypeKey;
};

type ConversationData = Database['public']['Tables']['conversations']['Row'] & {
	collections?: CollectionData | null;
};
