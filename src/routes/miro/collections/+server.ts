import { error, json } from '@sveltejs/kit';
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
	const { data, error: err } = await supabase
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

	if (!data) return json({ message: 'Failed to retrieve collection id' }, { status: 500 });
	if (err) return json({ message: err }, { status: 500 });

	const { data: mappingData, error: mappingErr } = await supabase
		.from('prompt_collection_mapping')
		.insert(body.promptIds.map((id) => ({ prompt: id, collection: data.id })));

	if (mappingErr) return json({ message: mappingErr }, { status: 500 });

	return json({ message: 'success' });
};
