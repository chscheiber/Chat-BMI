<script lang="ts">
	import BackNav from '$lib/components/BackNav.svelte';
	import DataList from '$lib/components/DataList/DataList.svelte';
	import type { DataListItem, DataListSettings } from '$lib/components/DataList/data-list';
	import type { PageData } from './$types';
	export let data: PageData;

	// const runPrompt = async (prompt: Prompt) => {
	// 	const items = await (window as any).miro.board.getSelection();
	// 	const context = new MiroContext(items);
	// 	prompt.context = await context.miroContent;
	// 	currentPrompts.set(prompt);
	// 	goto(`/miro/run`);
	// };

	const settings: DataListSettings = {
		title: data.promptType.name,
		elementNames: data.promptType.name + 's',
		add: {
			allow: true,
			path: `/miro/prompts/${data.promptType.key}/new/preview`
		}
	};

	const items: DataListItem[] = data.prompts.map((prompt) => {
		return {
			title: prompt.name,
			subtitle: prompt.description,
			href: `${prompt.type.key}/${prompt.promptId}/preview`
		};
	});
</script>

<BackNav heading="Prompt Types" />
<DataList {settings} {items} />
