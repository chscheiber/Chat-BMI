import jwtDecode from 'jwt-decode';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import type { MiroSession } from './types';

export const load = (async () => {
	let token: MiroSession | null = null;
	if (browser) token = jwtDecode<MiroSession>(await miro.board.getIdToken());
	return {
		userId: token?.user ? token.user : '',
		teamId: token?.team ? token.team : ''
	};
}) satisfies LayoutLoad;
