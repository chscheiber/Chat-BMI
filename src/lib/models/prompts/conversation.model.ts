import type { Prompt } from './prompt.model';

export class Conversation {
	public id = -1;
	public prompt: Prompt;
	public messages: Message[];
	public starred = false;

	constructor(prompt: Prompt) {
		this.prompt = prompt;
		this.messages = [];
	}

	public addMessage(text: string, role: Message['role']) {
		this.messages.push({ text, role });
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
