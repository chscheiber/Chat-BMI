<script lang="ts">
	import ConversationHistory from '$lib/components/StartingPage/ConversationHistory.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="overflow-y-auto">
	<ConversationHistory showTitle={false} conversations={data.conversations} />
</div>
