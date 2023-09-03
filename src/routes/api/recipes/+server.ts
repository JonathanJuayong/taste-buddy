import { deleteRecipe, getRecipesByNameByUserPaginated } from '$lib/server/db';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { searchQuery, lastSeenId, resultsPerPage, authorId } = (await request.json()) as {
		searchQuery: string;
		lastSeenId: number;
		resultsPerPage: number;
		authorId?: string | undefined;
	};

	// try to look 1 row ahead to check if data returned is the last batch of data,
	// hence the + 1 on resultsPerPage

	const recipes = await getRecipesByNameByUserPaginated(
		authorId ?? '',
		searchQuery,
		resultsPerPage + 1,
		lastSeenId
	);

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

export const DELETE = async ({ request, fetch }) => {
	const formData = await request.formData();
	const id = formData.get('id') as string | null;
	deleteRecipe(Number(id));

	try {
		await fetch('/api/images', { method: 'DELETE', body: formData });
	} catch (e) {
		console.log(e);
	}

	throw redirect(302, '/app');
};
