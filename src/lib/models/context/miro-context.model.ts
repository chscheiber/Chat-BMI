import type { FrameMiroBoardItem, MiroBoardItem } from './context.types';
import { Frame } from './frame.model';
import { ContentItem } from './content-item.model';

export class MiroContext {
	private contextItems: Record<string, { item: ContentItem; group?: string }> = {};
	public miroContent = '';

	public constructor();
	public constructor(boardItems: MiroBoardItem[]);
	public constructor(boardItems?: MiroBoardItem[]) {
		if (boardItems) this.updateItems(boardItems);
	}

	public async updateItems(boardItems?: MiroBoardItem[]): Promise<string> {
		this.contextItems = {};
		this.miroContent = '';

		if (!boardItems || boardItems.length === 0) {
			return '';
		}

		for (const item of boardItems) {
			if (ContentItem.types.includes(item.type)) {
				this.contextItems[item.id] = { item: new ContentItem(item) };
			} else if (item.type === 'frame') {
				const frame = new Frame(item as FrameMiroBoardItem);
				const children = await frame.getChildren();
				children.forEach((child) => {
					this.contextItems[child.id] = { item: child, group: frame.title };
				});
			}
		}
		this.miroContent = this.parse();
		return this.miroContent;
	}

	private parse(): string {
		const output: Record<string, string[]> = {};
		Object.values(this.contextItems)
			.filter((contextItem) => contextItem.item.parse().trim() !== '')
			.forEach((contextItem) => {
				if (contextItem.group) {
					if (!output[contextItem.group]) output[contextItem.group] = [];
					output[contextItem.group].push(contextItem.item.parse());
				} else {
					if (!output['']) output[''] = [];
					output[''].push(contextItem.item.parse());
				}
			});

		const result = Object.entries(output).map(([group, content]) => {
			if (group) {
				return `${group}\n - ${content.join('\n - ')}`;
			} else {
				return content.join('\n');
			}
		});

		return result.join('\n\n');
	}
}
