import { miroSession } from '$lib/store';
import jwt_decode from 'jwt-decode';
import type { MiroSession } from '../../routes/miro/types';

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
		await miro.board.deselect();
		const textObject = await miro.board.createStickyNote({
			content: `<p>${text}</p>`,
			x: 0,
			y: 0,
			width: 400
		});
		miro.board.viewport.zoomTo(textObject);
		miro.board.select({ id: textObject.id });
	}
}
