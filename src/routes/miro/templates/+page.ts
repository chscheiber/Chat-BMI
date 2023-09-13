import { CanvasTemplate } from '$lib/models/canvas-template.model';
import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load = (async () => {
	const { data, error } = await supabase.from('templates').select('*');
	const templates = data?.map((template) => new CanvasTemplate(template));
	return { templates };
}) satisfies PageLoad;
