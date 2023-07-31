import TurndownService from 'turndown';
import type { MiroBoardItem } from './context.types';

export class ContentItem {
	public readonly id: string;
	private content = '';

	public static readonly types = ['text', 'sticky_note', 'shape'];

	constructor(data: MiroBoardItem) {
		this.id = data.id;
		this.retrieveContent(data.content);
	}

	private retrieveContent(content: string) {
		const turndownService = new TurndownService({});
		this.content = turndownService.turndown(content);
	}

	public parse(): string {
		return this.content;
	}
}
