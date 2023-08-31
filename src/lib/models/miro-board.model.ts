import { browser } from '$app/environment';

export class MiroBoard {
	public static registerApp() {
		(window as any).miro.board.ui.on('icon:click', async () => {
			await (window as any).miro.board.ui.openPanel({
				// The content displayed on the panel is fetched from the specified HTML resource
				url: '/miro'
			});
		});
	}

	public static async writeToBoard(text: string) {
		await (window as any).miro.board.deselect();
		const textObject = await (window as any).miro.board.createText({
			content: `<p>${text}</p>`,
			x: 0,
			y: 0,
			width: 400
		});
		(window as any).miro.board.viewport.zoomTo(textObject);
		(window as any).miro.board.viewport.setZoom(1);
		(window as any).miro.board.select({ id: textObject.id });
	}
}
