import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { findLikedRecipesPaginated } from '$lib/server/db';

const resultsPerPage = 5;
const initialId = 1_000_000;

export const load = (async ({ locals }) => {
	const {
		user: { uid }
	} = locals;

	if (!uid) {
		throw error(401, 'uid cannot be null');
	}

	const likedRecipes = await findLikedRecipesPaginated(uid, resultsPerPage, initialId);

	return { likedRecipes };
}) satisfies PageServerLoad;

export const actions = {
	async default({ request, locals }) {
		const {
			user: { uid }
		} = locals;

		if (!uid) {
			throw error(401, 'uid cannot be null');
		}

		const formData = await request.formData();
		const lastSeenId = formData.get('lastSeenId') as string | null;

		const likedRecipes = await findLikedRecipesPaginated(
			uid,
			resultsPerPage,
			Number(lastSeenId) ?? initialId
		);

		return { likedRecipes, isLastPage: likedRecipes.length < resultsPerPage };
	}
};
