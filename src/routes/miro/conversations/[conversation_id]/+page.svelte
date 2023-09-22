<script lang="ts">
	import ConversationComponent from '$lib/components/ConversationComponent.svelte';

	export let data;
</script>

<ConversationComponent conversation={data.conversation} />
