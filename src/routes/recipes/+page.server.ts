import { searchRecipesByNamePaginated } from '$lib/server/db';
import type { PageServerLoad } from './$types';

const resultsPerPage = 5;
const initialId = 1_000_000;

export const load = (async ({ url }) => {
	const search = url.searchParams.get('search');

	// try to look 1 row ahead to check if data returned is the last batch of data,
	// hence the + 1 on resultsPerPage
	const recipes = await searchRecipesByNamePaginated(search ?? '', initialId, resultsPerPage + 1);

	// disregard the extra row fetched as it is only used to check if there are still data to be fetched
	const response = recipes.slice(0, resultsPerPage);
	const lastSeenId = response.at(-1)?.id ?? initialId;

	// if recipes.length is the same length or less than resultsPerPage despite fetching an additional row,
	// then we can confirm that there are no more recipes to be fetched and we can tell the
	// frontend to not make any more calls to db to fetch more data
	if (recipes.length <= resultsPerPage) {
		return { recipes: response, resultsPerPage, isLastPage: true, lastSeenId };
	}

	return { recipes: response, resultsPerPage, isLastPage: false, lastSeenId };
}) satisfies PageServerLoad;
