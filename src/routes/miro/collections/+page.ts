import { restrictQuery } from '$lib';
import { Collection } from '$lib/models/collection.model';
import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { userId, teamId } = await parent();
	const query = supabase
		.from('collections')
		.select('*, prompts(*, position:prompt_collection_mapping(position))');
	const { data, error: err } = await restrictQuery(query, userId, teamId);
	if (!data || err) throw error(500, 'Could not retrieve collections');
	const collections = data.map((collection) => new Collection(collection));
	return { collections };
}) satisfies PageLoad;
