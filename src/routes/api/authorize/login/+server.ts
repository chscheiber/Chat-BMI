import { SUPABASE_USER_DEFAULT_PW } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const json = await request.json();
	console.log('json', json);
	const userId = json['userId'];
	if (!userId) {
		throw error(400, 'Missing userId');
	}

	const { data, error: err } = await supabase.auth.signInWithPassword({
		email: `${userId}@genBMI`,
		password: `${SUPABASE_USER_DEFAULT_PW}`
	});
	if (err) {
		throw error(500, err.message);
	}
	return new Response(JSON.stringify(data), { status: 200 });
};
