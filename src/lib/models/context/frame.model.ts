import type { FrameMiroBoardItem } from './context.types';
import { ContentItem } from './content-item.model';

export class Frame {
	public title: string;
	private data: FrameMiroBoardItem;
	private children: Record<string, ContentItem> = {};

	constructor(data: FrameMiroBoardItem) {
		this.data = data;
		this.title = data.title;
		this.getChildren();
	}

	public async getChildren() {
		const childItems = await this.data.getChildren();
		const children: ContentItem[] = [];
		childItems.forEach((item) => {
			if (item.type === 'sticky_note') {
				children.push(new ContentItem(item));
				this.children[item.id] = new ContentItem(item);
			}
		});
		return children;
	}

	public parse(): string {
		let res = `${this.title}`;
		if (Object.keys(this.children).length > 0) {
			res += `:\n - ${Object.values(this.children)
				.map((item) => item.parse())
				.join('\n - ')}`;
		}
		return res;
	}
}
