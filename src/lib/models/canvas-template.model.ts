import type { Database } from '$lib/database';
import type { StickyNoteProps } from '@mirohq/websdk-types';
import type { MiroBoardItem } from './context/context.types';

export class CanvasTemplate {
	public createdAt: Date;
	public description: string;
	public id: number;
	public imageUrl: string | null;
	public title: string;
	public source: string | null;
	public items: MiroBoardItem[] = [];

	constructor(data: CanvasTemplateData) {
		this.createdAt = new Date(data.created_at);
		this.description = data.description;
		this.id = data.id;
		this.imageUrl = data.image_url;
		this.title = data.title;
		this.source = data.source;
		this.items = (data.items?.valueOf() as MiroBoardItem[]) ?? [];
	}
}

export type CanvasTemplateData = Database['public']['Tables']['templates']['Row'];
