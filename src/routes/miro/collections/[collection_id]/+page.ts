import { restrictQuery } from '$lib';
import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { Collection } from '$lib/models/collection.model';

export const load = (async ({ parent, params }) => {
	const { userId, teamId } = await parent();
	const query = supabase
		.from('collections')
		.select('*, prompts(*, position:prompt_collection_mapping(position))')
		.eq('id', params.collection_id);
	const { data, error: err } = await restrictQuery(query, userId, teamId).single();
	if (!data || err) throw error(500, 'Could not retrieve collection');
	const collection = new Collection(data);
	return { collection };
}) satisfies PageLoad;
