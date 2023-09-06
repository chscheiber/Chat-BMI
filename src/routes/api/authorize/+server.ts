import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	MIRO_CLIENT_SECRET,
	MIRO_REDIRECT_URI,
	SUPABASE_USER_DEFAULT_PW
} from '$env/static/private';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const clientId = url.searchParams.get('client_id');
	const teamId = url.searchParams.get('team_id');

	if (!code || !clientId || !teamId) {
		throw error(400, 'Missing code, client_id, or team_id');
	}

	const redirectUrl = `https://miro.com/app-install-completed/?client_id=${clientId}&team_id=${teamId}`;
	const authUrl = `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${MIRO_CLIENT_SECRET}&code=${code}&redirect_uri=${MIRO_REDIRECT_URI}`;

	const authorizationResponse = await fetch(authUrl, {
		method: 'POST'
	});

	const result = await authorizationResponse.json();

	const miro_access_token = result.access_token;
	const miro_user_id = result.user_id;
	const modifiedAtTime = new Date();

	// let data: AuthResponse['data'] | null = null;
	const signUp = await supabase.auth.signUp({
		email: `${miro_user_id}@genBMI`,
		password: `${SUPABASE_USER_DEFAULT_PW}`
	});
	// if (signUp.error) {
	// 	if (signUp.error.message.includes('User already registered')) {
	// 		const signIn = await supabase.auth.signInWithPassword({
	// 			email: `${miro_user_id}@genBMI`,
	// 			password: `${SUPABASE_USER_DEFAULT_PW}`
	// 		});
	// 		data = signIn.data;
	// 	}
	// } else {
	// 	data = signUp.data;
	// }
	// console.log(data);
	// cookies.set('supabase', JSON.stringify(data?.session ?? ''), {
	// 	path: '/',
	// 	sameSite: 'none'
	// });
	// console.log('cookies', cookies.get('supabase'));

	return new Response(null, {
		status: 302,
		headers: { Location: redirectUrl, 'Cache-Control': 'no-cache' }
	});
};
