import { getRecipesByNameByUserPaginated, getUserById } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
	const { id } = params;

	const user = await getUserById(id);

	if (!user) {
		throw error(404, 'User not found');
	}

	const resultsPerPage = 5;
	const recipeId = 1_000_000;
	const recipes = await getRecipesByNameByUserPaginated(id, '', resultsPerPage, recipeId);

	return { user, recipes, resultsPerPage };
}) satisfies PageServerLoad;
