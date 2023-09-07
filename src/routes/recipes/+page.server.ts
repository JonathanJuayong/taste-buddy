import type { MainSchema } from '$lib/formSchema';
import { searchRecipesByNamePaginated } from '$lib/server/db';
import type { PageServerLoad } from './$types';

const resultsPerPage = 5;
const initialId = 1_000_000;
const maxNumberOfItemsToBeFetched = 100;

export const load = (async ({ url }) => {
	const params = url.searchParams;
	const search = params.get('search');
	const items = params.get('items') as number | null;
	const id = params.get('id') as number | null;

	const numberOfItemsToBeFetched = items ?? resultsPerPage;

	// only fetch upto max number of items in db. ignore value if it exceeds max limit
	const limitedItems =
		numberOfItemsToBeFetched > maxNumberOfItemsToBeFetched
			? maxNumberOfItemsToBeFetched
			: numberOfItemsToBeFetched;

	const recipes: MainSchema[] = await searchRecipesByNamePaginated(
		search ?? '',
		id ?? initialId,
		limitedItems
	);

	const lastSeenId = recipes.at(-1)?.id ?? initialId;

	return { recipes, resultsPerPage, isLastPage: false, lastSeenId };
}) satisfies PageServerLoad;
