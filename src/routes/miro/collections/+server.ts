import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Visibility } from '$lib/types';
import { supabase } from '$lib/supabase';

export type NewCollectionBody = {
	title: string;
	description: string;
	visibility: Visibility;
	userId: string;
	teamId: string;
	promptIds: number[];
};

export const POST: RequestHandler = async ({ request }) => {
	const body: NewCollectionBody = await request.json();
	const { data, error } = await supabase
		.from('collections')
		.insert({
			title: body.title,
			description: body.description,
			visibility: body.visibility,
			user_id: body.userId,
			team_id: body.teamId
		})
		.select('id')
		.single();

	if (!data) return json({ success: false });

	const { data: _, error: __ } = await supabase
		.from('prompt_collection_mapping')
		.insert(body.promptIds.map((id) => ({ prompt: id, collection: data.id })));
	console.log(_, __);
	return json({ success: true });
};
