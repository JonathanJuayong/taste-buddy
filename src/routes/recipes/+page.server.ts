import { getRecipesPaginated } from '$lib/server/db';
import type { PageServerLoad } from './$types';

const resultsPerPage = 5;

export const load = (async () => {
	const initialId = 0;

	// try to look 1 row ahead to check if data returned is the last batch of data,
	// hence the + 1 on resultsPerPage
	const recipes = await getRecipesPaginated(resultsPerPage + 1, initialId);

	// disregard the extra row fetched as it is only used to check if there are still data to be fetched
	const response = recipes.slice(0, resultsPerPage);

	// if recipes.length is the same length or less than resultsPerPage despite fetching an additional row,
	// then we can confirm that there are no more recipes to be fetched and we can tell the
	// frontend to not make any more calls to db to fetch more data
	if (recipes.length <= resultsPerPage) {
		return { recipes: response, resultsPerPage, isLastPage: true };
	}

	return { recipes: response, resultsPerPage, isLastPage: false };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const result = await request.formData();
		const value = result.get('value') as number | null;

		if (!value) return;

		// do the same thing as in the load function
		const recipes = await getRecipesPaginated(resultsPerPage + 1, value);
		const response = recipes.slice(0, resultsPerPage);

		if (recipes.length <= resultsPerPage)
			return {
				recipes: response,
				isLastPage: true
			};

		return { recipes: response, isLastPage: false };
	}
};
