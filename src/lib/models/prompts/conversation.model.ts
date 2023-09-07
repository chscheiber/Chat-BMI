import type { Prompt } from './prompt.model';

export class Conversation {
	public prompt: Prompt;
	public messages: Message[] = [];

	constructor(prompt: Prompt) {
		this.prompt = prompt;
		this.addMessage(prompt.signifier, 'human');
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
