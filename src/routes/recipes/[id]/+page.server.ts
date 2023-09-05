import type { PageServerLoad } from '../$types';
import { createLike, deleteLike, getRecipeById, isLiked } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { invalidateAll } from '$app/navigation';

export const load = (async ({ locals, params }) => {
	const { id } = params;
	// avoid isNan errors by coercing id into number
	const typeCheckedId = isNaN(Number(id)) ? -1 : Number(id);
	const recipe = await getRecipeById(typeCheckedId);

	const {
		user: { uid }
	} = locals;

	const recipeIsLiked = await isLiked(Number(id), uid ?? '');

	if (recipe) {
		return {
			recipe,
			// if user uid is the same as author_id, allow edit
			editable: uid === recipe.author_id,
			recipeIsLiked,
			uid
		};
	}
	return { recipe, editable: false, recipeIsLiked, uid };
}) satisfies PageServerLoad;

export const actions = {
	async like({ locals, params }) {
		const {
			user: { uid }
		} = locals;

		if (!uid) {
			throw error(401, 'uid cannot be null');
		}

		const { id } = params;

		await createLike(Number(id), uid);
	},
	async unlike({ locals, params }) {
		const {
			user: { uid }
		} = locals;

		if (!uid) {
			throw error(401, 'uid cannot be null');
		}

		const { id } = params;

		await deleteLike(Number(id), uid);
	}
};
