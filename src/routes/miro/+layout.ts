import { supabase } from '$lib/supabase';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	const { data, error } = await supabase.from('prompt_types').select('*');
	if (error) throw error;
	return { promptTypes: data ?? [] };
}) satisfies LayoutLoad;
