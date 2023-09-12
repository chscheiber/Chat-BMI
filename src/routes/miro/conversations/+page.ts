import { Conversation } from '$lib/models/prompts/conversation.model';
import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { userId } = await parent();

	const { data, error } = await supabase
		.from('conversations')
		.select('*')
		.eq('user_id', userId)
		.order('last_modified', { ascending: false });

	const conversations = (data ?? []).map((conversation) => new Conversation(conversation));
	return { conversations };
}) satisfies PageLoad;
