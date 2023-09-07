import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const {
		user: { uid }
	} = locals;
	return { uid };
}) satisfies PageServerLoad;
