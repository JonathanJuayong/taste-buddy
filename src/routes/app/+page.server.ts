import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';

export const load = (async ({ locals, cookies }) => {
	if (!locals.user.uid) {
		createTemporaryRedirectCookie(cookies);
		throw redirect(302, '/signin');
	}
}) satisfies PageServerLoad;
