import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load = (async ({ parent, params }) => {
	const { promptTypes } = await parent();
	const allowedPromptTypes = promptTypes.map((pt) => pt.type);

	if (!allowedPromptTypes.includes(params.prompt_type)) throw error(404);

	const selectedPromptType = promptTypes.find((pt) => pt.type === params.prompt_type);

	const { data } = await supabase
		.from('user_prompts')
		.select('*, prompt_types (*)')
		.eq('type', selectedPromptType?.id);
	return { selectedPromptType, prompts: data ?? [] };
}) satisfies PageLoad;
