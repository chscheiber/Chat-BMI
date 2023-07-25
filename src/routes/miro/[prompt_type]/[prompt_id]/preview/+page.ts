import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { data: promptElements, error: err } = await supabase
		.from('prompt_elements_view')
		.select(`pe_name, input_type, key`)
		.eq('type', params.prompt_type);

	const { data: userPromptElements, error: err1 } = await supabase
		.from('user_prompt_elements_view')
		.select(`*`)
		.eq('prompt_id', params.prompt_id);

	const { data: prompt, error: err2 } = await supabase
		.from('user_prompts')
		.select(`*`)
		.eq('id', params.prompt_id)
		.single();

	if (err || err1 || err2) throw error(404);
	return { params, promptElements, userPromptElements, prompt };
}) satisfies PageLoad;
