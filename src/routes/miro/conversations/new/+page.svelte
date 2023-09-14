<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib';
	import type { Conversation } from '$lib/models/prompts/conversation.model';
	import { currentContext, miroSession, newConversation } from '$lib/store';
	import { supabase } from '$lib/supabase.js';

	export let data;
	let conversation = $newConversation;

	if (!conversation) {
		goto('/miro');
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
	} else goto('/miro');

	const teamId = $miroSession?.team ?? '';
	const userId = $miroSession?.user ?? '';

	if (!userId || !teamId) {
		goto('/miro');
	}

	supabase
		.from('conversations')
		.insert({
			team_id: teamId,
			user_id: userId,
			title: conversation.title,
			collection: conversation.collection?.id,
			messages: conversation.messages
		})
		.select('id')
		.single()
		.then((res) => {
			console.log(res.data);
			if (res.data?.id) goto(`${ROUTES.CONVERSATION}/${res.data.id}`);
			else goto('/miro');
		});
</script>
