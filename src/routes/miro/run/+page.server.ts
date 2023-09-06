import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { userId } = await parent();
	return {};
}) satisfies PageServerLoad;
