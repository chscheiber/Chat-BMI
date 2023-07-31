import { ContentItem } from './content-item.model';

export type MiroBoardItem = {
	content: string;
	type: MiroItemType;
	id: string;
	[key: string]: string;
};

export const miroItemTypes = ['frame', ...ContentItem.types] as const;
export type MiroItemType = (typeof miroItemTypes)[number];

export interface ContextItem {
	parse(): Promise<string>;
}

export type FrameMiroBoardItem = MiroBoardItem & {
	title: string;
	getChildren: () => Promise<MiroBoardItem[]>;
};
