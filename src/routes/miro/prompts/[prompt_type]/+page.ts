import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';
import { PROMPT_TYPES, Prompt, PromptFactory, restrictQuery } from '$lib';

export const load = (async ({ params, parent }) => {
	const promptType = PROMPT_TYPES.find((type) => type.key === params.prompt_type);

	if (!promptType) throw error(404);

	let query = supabase
		.from('prompts')
		.select('*, scenario:scenarios(*), persona:personas(*)')
		.eq('type', promptType.key);

	const { userId, teamId } = await parent();
	query = restrictQuery(query, userId, teamId);
	const { data, error: err } = await query;

	if (err) throw error(404);

	const prompts: Prompt[] = [];
	if (!data) return { promptType, prompts };

	for (const promptData of data) {
		prompts.push(PromptFactory.createPrompt(promptType.key, promptData));
	}

	return { promptType, prompts };
}) satisfies PageLoad;
