import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { Conversation } from '$lib/models/prompts/conversation.model';

export const load = (async ({ params }) => {
	const conversationId = params.conversation_id;

	if (conversationId === 'new') return { conversation: null, params };

	const { data, error: err } = await supabase
		.from('conversations')
		.select('*')
		.eq('id', conversationId)
		.single();

	if (!data || err) throw error(500, err?.message);

	const conversation = new Conversation(data);
	return { conversation, params };
}) satisfies PageLoad;
