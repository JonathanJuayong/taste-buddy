import { getRecipesByUser } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const {
		user: { uid }
	} = locals;

	if (!uid) {
		throw redirect(301, '/signin');
	}

	const recipes = await getRecipesByUser(uid);
	return { recipes };
}) satisfies PageServerLoad;
