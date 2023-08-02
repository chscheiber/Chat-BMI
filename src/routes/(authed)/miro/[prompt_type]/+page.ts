import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PROMPT_TYPES, Prompt, PromptFactory } from '$lib';

export const load = (async ({ params, parent }) => {
	const { supabase, session } = await parent();

	// if (!session) {
	// 	throw redirect(303, '/');
	// }

	const promptType = PROMPT_TYPES.find((type) => type.key === params.prompt_type);

	if (!promptType) throw error(404);

	const { data, error: err } = await supabase
		.from('prompts')
		.select('*, scenario:scenarios(*), persona:personas(*)')
		.eq('type', promptType.key);

	if (err) throw error(404);

	const prompts: Prompt[] = [];
	if (!data) return { promptType, prompts };

	for (const promptData of data) {
		prompts.push(PromptFactory.createPrompt(promptType.key, promptData));
	}

	return { promptType, prompts, user: session?.user };
}) satisfies PageLoad;
