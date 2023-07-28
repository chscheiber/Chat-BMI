export class MiroContext {
	private contextItems: ContextItem[] = [];
	public miroContent: Promise<string>;
	public hasContext: Promise<boolean>;

	public constructor(boardItem: MiroBoardItem[]) {
		this.contextItems = [];
		this.miroContent = new Promise((resolve) => resolve(''));
		this.hasContext = new Promise((resolve) => resolve(false));

		if (!boardItem || boardItem.length === 0) {
			return;
		}

		for (const item of boardItem) {
			switch (item.type) {
				case 'sticky_note':
					this.contextItems.push(new StickNote(item));
					break;
				case 'frame':
					this.contextItems.push(new Frame(item as FrameMiroBoardItem));
					break;
			}
		}
		this.miroContent = this.parse();
		this.hasContext = new Promise((resolve) => resolve(this.contextItems.length > 0));
	}

	public async parse(): Promise<string> {
		const content = await Promise.all(this.contextItems.map((item) => item.parse()));
		return content.join('\n');
	}
}

class StickNote implements ContextItem {
	private content = '';

	constructor(data: MiroBoardItem) {
		this.content = data.content.replace('<p>', '').replace('</p>', '');
	}

	public async parse(): Promise<string> {
		return this.content;
	}
}

class Frame implements ContextItem {
	private title: string;
	private childrenPromise: Promise<MiroBoardItem[]>;

	constructor(data: FrameMiroBoardItem) {
		this.title = data.title;
		this.childrenPromise = data.getChildren();
	}

	public async parse(): Promise<string> {
		const children = await this.childrenPromise;
		const items: ContextItem[] = [];
		children.forEach((item) => {
			if (item.type === 'sticky_note') {
				items.push(new StickNote(item));
			}
		});
		const parsedChildren = await Promise.all(items.map((item) => item.parse()));
		const res = `${this.title}:\n - ` + parsedChildren.join('\n - ');
		return res;
	}
}

type MiroBoardItem = {
	content: string;
	type: MiroItemType;
	[key: string]: string;
};

const miroItemTypes = ['sticky_note', 'frame'] as const;
type MiroItemType = (typeof miroItemTypes)[number];

interface ContextItem {
	parse(): Promise<string>;
}

type FrameMiroBoardItem = MiroBoardItem & {
	title: string;
	getChildren: () => Promise<MiroBoardItem[]>;
};
