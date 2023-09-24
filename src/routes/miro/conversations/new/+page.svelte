<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib';
	import ConversationComponent from '$lib/components/ConversationComponent.svelte';
	import type { Conversation } from '$lib/models/prompts/conversation.model.js';
	import { currentContext, miroSession, newConversation } from '$lib/store';
	import { supabase } from '$lib/supabase.js';

	export let data;
	let conversation = $newConversation;

	if (browser && !conversation) {
		goto(ROUTES.HOME);
	}

	conversation = conversation as Conversation;

	const prompt = conversation.prompt ?? conversation.collection?.prompts[0];
	if (prompt) {
		prompt.context = $currentContext;
		conversation.addMessage({
			text: prompt.toString(),
			role: 'human',
			promptType: prompt.type.key
		});
	} else {
		if (browser) goto(ROUTES.HOME);
	}

	if (browser) {
		const teamId = $miroSession?.team ?? '';
		const userId = $miroSession?.user ?? '';
		supabase.from('conversations').insert({
			team_id: teamId,
			user_id: userId,
			title: conversation.title,
			collection: conversation.collection?.id,
			messages: conversation.messages
		});
	}
</script>

{#if conversation}
	<ConversationComponent {conversation} />
{:else}
	<p>Conversation not found.</p>
{/if}
