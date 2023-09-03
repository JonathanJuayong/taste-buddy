import type { PageServerLoad } from '../$types';
import { getRecipeById } from '$lib/server/db';

export const load = (async ({ locals, params }) => {
	const { id } = params;
	// avoid isNan errors by coercing id into number
	const typeCheckedId = isNaN(Number(id)) ? -1 : Number(id);
	const recipe = await getRecipeById(typeCheckedId);

	if (recipe) {
		return {
			recipe,
			// if user uid is the same as author_id, allow edit
			editable: locals.user.uid === recipe.author_id
		};
	}
	return { recipe };
}) satisfies PageServerLoad;
