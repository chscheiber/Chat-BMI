import { miroSession } from '$lib/store';
import jwt_decode from 'jwt-decode';
import type { MiroSession } from '../../routes/miro/types';
import type { StickyNote } from '@mirohq/websdk-types';

export class MiroBoard {
	public static async registerApp() {
		miro.board.ui.on('icon:click', async () => {
			await miro.board.ui.openPanel({
				// The content displayed on the panel is fetched from the specified HTML resource
				url: '/miro'
			});
		});
		const session = jwt_decode<MiroSession>(await miro.board.getIdToken());
		miroSession.set(session);
	}

	public static async writeToBoard(text: string) {
		const selection = await miro.board.getSelection();
		await miro.board.deselect();
		const stickyNotesContent: string[] = [];
		const stickyNotes: StickyNote[] = [];
		const maxContentLength = 6000;

		/* Split text into paragraphs */
		const regex = /(^\d\. )(.*)/;
		text.split('\n\n').forEach((line) => {
			if (line.length === 0) return;
			const match = regex.exec(line);
			if (match && match.length === 3) line = match[2];
			if (line.length < maxContentLength) {
				stickyNotesContent.push(line);
			} else {
				for (let i = 0; i < Math.ceil(text.length / maxContentLength); i++) {
					const content = text.substring(i * maxContentLength, (i + 1) * maxContentLength);
					stickyNotesContent.push(content);
				}
			}
		});

		/* If a frame is selected, add all sticky notes to this frame */
		// if (selection.length === 1 && selection[0].type === 'frame') {
		// 	const frame = selection[0];
		// 	stickyNotesContent.forEach(async (content) => {
		// 		const stickyNote = await miro.board.createStickyNote({
		// 			content: `<p>${content}</p>`,
		// 			x: frame.x + frame.width / 2 - 50,
		// 			y: frame.y + frame.height / 2 - 50,
		// 			width: 100
		// 		});
		// 		frame.add(stickyNote);
		// 	});
		// 	return;
		// }

		/* Create sticky notes  in the center of the viewport */
		const viewport = await miro.board.viewport.get();
		const x = viewport.x + viewport.width / 2;
		const y = viewport.y + viewport.height / 2;
		const width = 200;
		const spacing = 40;
		const columns = 4;
		const maxWidth = columns * (width + spacing);

		for (let i = 0; i < stickyNotesContent.length; i++) {
			const stickyNote = await miro.board.createStickyNote({
				content: `<p>${stickyNotesContent[i]}</p>`,
				x: x + ((i * (width + spacing)) % maxWidth),
				y: y + Math.floor((i * (width + spacing)) / maxWidth) * (width + spacing),
				width
			});
			stickyNotes.push(stickyNote);
		}
		miro.board.select({ id: stickyNotes.map((note) => note.id) });
	}
}
