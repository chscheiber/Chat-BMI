import { supabase } from '$lib/supabase';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type DeleteCollectionBody = {
	userId: string;
};

export const DELETE: RequestHandler = async ({ params, request }) => {
	const { collection_id } = params;
	const body = await request.json();

	const { data, error: err } = await supabase
		.from('collections')
		.delete()
		.eq('id', collection_id)
		.eq('user_id', body.userId);

	if (err) throw error(500, err?.message);
	return json({ success: true });
};
