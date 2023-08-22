import { deleteRecipe, getRecipeById, updateRecipe } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { mainSchema } from '$lib/formSchema';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	if (!locals.user.uid) {
		throw redirect(302, '/signin');
	}

	const { id } = params;

	// avoid isNan errors by coercing id into number
	const typeCheckedId = isNaN(Number(id)) ? -1 : Number(id);
	const recipe = await getRecipeById(typeCheckedId);

	if (recipe) {
		const form = await superValidate(recipe, mainSchema);
		return {
			form,
			recipe,
			// if user uid is the same as author_id, allow edit
			editable: locals.user.uid === recipe.author_id
		};
	}
	return { recipe };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request }) => {
		const form = await superValidate(request, mainSchema);
		const newRecipe = form.data;
		updateRecipe(Number(newRecipe.id), newRecipe);
	},
	delete: async ({ params }) => {
		const { id } = params;
		deleteRecipe(Number(id));
		throw redirect(302, '/app');
	}
};
