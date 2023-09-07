import { getRecipesByNameByUserPaginated } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';
import type { MainSchema } from '$lib/formSchema';
import type { PageServerLoad } from './$types.js';

const resultsPerPage = 20;
const lastSeenId = 1_000_000;

export const load = (async ({ locals, cookies, url }) => {
	const {
		user: { uid }
	} = locals;

	if (!uid) {
		createTemporaryRedirectCookie(cookies);
		throw redirect(302, '/signin');
	}

	const params = url.searchParams;
	const search = params.get('search') ?? '';

	const recipes: MainSchema[] = await getRecipesByNameByUserPaginated(
		uid,
		search,
		resultsPerPage,
		lastSeenId
	);

	return { recipes };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, url }) => {
		const {
			user: { uid }
		} = locals;

		if (!uid) {
			return;
		}

		const params = url.searchParams;
		const search = params.get('search') ?? '';
		const formData = await request.formData();
		const lastSeenId = formData.get('lastSeenId') as string | null;

		const recipes: MainSchema[] = await getRecipesByNameByUserPaginated(
			uid,
			search,
			resultsPerPage,
			Number(lastSeenId)
		);

		return { recipes, resultsPerPage };
	}
};
