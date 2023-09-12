import type { Database } from '$lib/database';
import { Prompt } from './prompt.model';

export class Conversation {
	public id = 0;
	public prompt?: Prompt;
	public messages: Message[] = [];
	public userId = '';
	public teamId = '';
	public createdAt = new Date();
	public lastModified = new Date();
	public title = '';

	constructor(data?: Prompt | ConversationData) {
		if (!data) return;
		if (data instanceof Prompt) {
			this.prompt = data;
			this.title = this.prompt.signifier;
			this.addMessage(prompt.toString(), 'human');
			if (this.prompt.userId) this.userId = this.prompt.userId;
			if (this.prompt.teamId) this.teamId = this.prompt.teamId;
		} else {
			this.id = data?.id ?? 0;
			this.userId = data?.user_id ?? 0;
			this.teamId = data?.team_id ?? 0;
			this.messages = (data?.messages?.valueOf() as Message[]) ?? [];
			this.createdAt = new Date(data?.created_at ?? new Date());
			this.lastModified = new Date(data?.last_modified ?? new Date());
			this.title = data?.title ?? '';
		}
	}

	public addMessage(message: Message): void;
	public addMessage(text: string, role: Message['role']): void;
	public addMessage(text: string | Message, role?: Message['role']): void {
		if ((text as Message).role) this.messages.push(text as Message);
		else this.messages.push({ text: text as string, role: role ?? 'human' });
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
};

type ConversationData = Database['public']['Tables']['conversations']['Row'] & {
	last_modified: string;
	title: string;
};
