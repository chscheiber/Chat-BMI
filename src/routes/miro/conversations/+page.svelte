<script lang="ts">
	import { navigating } from '$app/stores';
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="h2 mb-4">All Conversations</h2>
<ConversationHistory showTitle={false} conversations={data.conversations} />
