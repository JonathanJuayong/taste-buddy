import { deleteRecipe, getRecipeById, updateRecipe } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { mainSchema } from '$lib/formSchema';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { id } = params;
	const recipe = getRecipeById(id);
	if (recipe) {
		const form = await superValidate(recipe, mainSchema);
		return { form, recipe, editable: true };
	}
	return { recipe };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request }) => {
		const form = await superValidate(request, mainSchema);
		const newRecipe = form.data;
		updateRecipe(newRecipe.id, newRecipe);
	},
	delete: async ({ params }) => {
		const { id } = params;
		deleteRecipe(id);
		throw redirect(301, '/app');
	}
};
