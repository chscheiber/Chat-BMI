<script lang="ts">
	import { ROUTES } from '$lib';
	import BackNav from '$lib/components/BackNav.svelte';
	import DataList from '$lib/components/DataList/DataList.svelte';
	import type { DataListItem, DataListSettings } from '$lib/components/DataList/data-list';
	import type { PageData } from './$types';
	export let data: PageData;

	const settings: DataListSettings = {
		title: data.promptType.name,
		elementNames: data.promptType.name + 's',
		add: {
			allow: true,
			path: `${ROUTES.PROMPTS}/${data.promptType.key}/new`
		}
	};

	const items: DataListItem[] = data.prompts.map((prompt) => {
		return {
			title: prompt.name,
			subtitle: prompt.description ?? prompt.signifier,
			href: `${prompt.type.key}/${prompt.promptId}`
		};
	});
</script>

<!-- <BackNav heading="Prompt Types" /> -->
<DataList {settings} {items} />
