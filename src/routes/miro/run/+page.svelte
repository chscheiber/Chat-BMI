<!-- 
	/miro/run/[conversation_id]

	A conversation consists of one or more prompts inlcuding the responses.
	Conversations are stored in the database and can be retrieved by the conversation_id.

 -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import BackNav from '$lib/components/BackNav.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import { currentPrompts } from '$lib/store';

	const prompts = $currentPrompts;
	const prompt = prompts[0];

	// No prompt selected, go back to the main page
	if (!prompt && browser) {
		goto('/miro');
	}
</script>

<div class="flex flex-col mb-4">
	<BackNav heading="Run prompt" />
</div>
<Chat {prompt} />
