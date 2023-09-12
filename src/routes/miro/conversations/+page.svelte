<script lang="ts">
	import DataList from '$lib/components/DataList/DataList.svelte';
	import type { DataListItem, DataListSettings } from '$lib/components/DataList/data-list';
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="h2 mb-4">All Conversations</h2>
<ConversationHistory showTitle={false} conversations={data.conversations} />
