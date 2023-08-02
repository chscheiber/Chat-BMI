import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PromptFactory, type PromptTypeKey } from '$lib';

export const load = (async ({ params }) => {
	if (params.prompt_id === 'new') {
		return { prompt: null, params };
	}

	const { data, error: err } = await supabase
		.from('prompts')
		.select('*, scenario:scenarios(*), persona:personas(*)')
		.eq('id', params.prompt_id)
		.single();

	// No prompt with that id found
	if (err) throw error(404);

	const prompt = PromptFactory.createPrompt(data.type as PromptTypeKey, data);
	return { prompt, params };
}) satisfies PageLoad;
