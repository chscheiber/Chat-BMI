import type { Prompt } from '$lib';
import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data, error } = await supabase.from('prompts').select('*').limit(2);
	if (error) throw error;
	return { prompts: (data as Prompt[]) ?? [] };
}) satisfies PageServerLoad;
