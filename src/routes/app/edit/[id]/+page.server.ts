import { getRecipeById, updateRecipe } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { mainSchema } from '$lib/formSchema';
import { error, redirect } from '@sveltejs/kit';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';

export const load = (async ({ params, locals, cookies }) => {
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

			if (!form.valid) {
				throw error(400, 'Invalid data submitted');
			}

			if (file && file.size > 0) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('publicId', previousImage ?? '');

				// delete previous image
				await fetch('/api/images', { method: 'DELETE', body: formData });

				// upload new image
				const req = await fetch('/api/images', { method: 'POST', body: formData });
				const { public_id } = (await req.json()) as { public_id: string };

				// replace old with new image in db
				const { data } = form;
				data.image_src = public_id ?? data.image_src;
				updateRecipe(Number(data.id), data);
			} else {
				const { data } = form;
				updateRecipe(Number(data.id), data);
			}
		} catch (e) {
			throw error(400, `Something went wrong: ${e}`);
		}
	}
};
