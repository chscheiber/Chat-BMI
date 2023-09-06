import { userId } from '$lib/store';

export class MiroBoard {
	public static async registerApp() {
		miro.board.ui.on('icon:click', async () => {
			await miro.board.ui.openPanel({
				// The content displayed on the panel is fetched from the specified HTML resource
				url: '/miro'
			});
		});
		const userInfo = await miro.board.getUserInfo();
		userId.set(userInfo.id);
	}

	public static async writeToBoard(text: string) {
		await miro.board.deselect();
		const textObject = await miro.board.createText({
			content: `<p>${text}</p>`,
			x: 0,
			y: 0,
			width: 400
		});
		miro.board.viewport.zoomTo(textObject);
		miro.board.select({ id: textObject.id });
	}
}
