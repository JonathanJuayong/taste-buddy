import { searchRecipesByNamePaginated } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { searchQuery, lastSeenId, resultsPerPage } = (await request.json()) as {
		searchQuery: string;
		lastSeenId: number;
		resultsPerPage: number;
	};

	// try to look 1 row ahead to check if data returned is the last batch of data,
	// hence the + 1 on resultsPerPage
	const recipes = await searchRecipesByNamePaginated(searchQuery, lastSeenId, resultsPerPage + 1);

	// disregard the extra row fetched as it is only used to check if there are still data to be fetched
	const response = recipes.slice(0, resultsPerPage);
	const lastId = response.at(-1)?.id ?? lastSeenId;

	// if recipes.length is the same length or less than resultsPerPage despite fetching an additional row,
	// then we can confirm that there are no more recipes to be fetched and we can tell the
	// frontend to not make any more calls to db to fetch more data
	if (recipes.length <= resultsPerPage) {
		return json({
			recipes: response,
			isLastPage: true,
			lastId
		});
	}

	return json({
		recipes: response,
		isLastPage: false,
		lastId
	});
};
