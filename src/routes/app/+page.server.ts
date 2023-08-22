import { getRecipesByUser } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';

export const load = (async ({ locals, cookies }) => {
	const {
		user: { uid }
	} = locals;

	if (!uid) {
		createTemporaryRedirectCookie(cookies);
		throw redirect(302, '/signin');
	}

	const recipes = await getRecipesByUser(uid);
	return { recipes };
}) satisfies PageServerLoad;
