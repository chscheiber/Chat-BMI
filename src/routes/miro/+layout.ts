import { supabase } from '$lib/supabase';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	const { data, error } = await supabase
		.from('prompt_types')
		.select('*')
		.order('order', { ascending: true });
	if (error) throw error;
	return { promptTypes: data ?? [] };
}) satisfies LayoutLoad;
