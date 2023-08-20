import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	throw redirect(301, '/recipes');

	const user = locals.user ?? null;
	return { user };
}) satisfies PageServerLoad;
