import jwtDecode from 'jwt-decode';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import type { MiroSession } from './types';

export const load = (async () => {
	let token: MiroSession | null = null;
	if (browser) token = jwtDecode<MiroSession>(await miro.board.getIdToken());
	return {
		userId: token?.user ? Number(token.user) : -1,
		teamId: token?.team ? Number(token.team) : -1
	};
}) satisfies LayoutLoad;
