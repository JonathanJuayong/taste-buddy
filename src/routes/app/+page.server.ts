import { getRecipes } from '$lib/server/db';
import type { RecipeCard } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const recipes: RecipeCard[] = getRecipes() ?? [];
	return { recipes };
}) satisfies PageServerLoad;
