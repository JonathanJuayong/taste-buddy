import { deleteRecipe, getRecipeById, updateRecipe } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { mainSchema, type MainSchema } from '$lib/formSchema';
import { error, redirect } from '@sveltejs/kit';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';

export const load = (async ({ params, locals, cookies }) => {
	if (!locals.user.uid) {
		createTemporaryRedirectCookie(cookies);
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
	update: async ({ request, fetch }) => {
		try {
			const data = await request.clone().formData();
			const file = data.get('file') as File | null;
			const previousImage = data.get('previousImage') as string | null;

			const form = await superValidate(request.clone(), mainSchema);

			if (file) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('publicId', previousImage ?? '');

				// delete previous image
				await fetch('/api/images', { method: 'DELETE', body: formData });

				// upload new image
				const req = await fetch('/api/images', { method: 'POST', body: formData });
				const { public_id } = (await req.json()) as { public_id: string };

				// replace old with new image in db
				const newRecipe: MainSchema = { ...form.data, image_src: public_id ?? form.data.image_src };
				updateRecipe(Number(newRecipe.id), newRecipe);
			} else {
				const newRecipe = form.data;
				updateRecipe(Number(newRecipe.id), newRecipe);
			}
		} catch (e) {
			console.log(e);
			throw error(400, 'Shit hit the fan');
		}
	},
	delete: async ({ params, request, fetch }) => {
		const { id } = params;
		deleteRecipe(Number(id));
		const formData = await request.formData();

		try {
			await fetch('/api/images', { method: 'DELETE', body: formData });
		} catch (e) {
			console.log(e);
		}

		throw redirect(302, '/app');
	}
};
