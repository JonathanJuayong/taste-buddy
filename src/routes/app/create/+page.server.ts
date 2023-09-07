import { mainSchema, type MainSchema } from '$lib/formSchema';
import { addRecipe } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';

export const load = (async ({ locals, cookies }) => {
	if (!locals.user.uid) {
		createTemporaryRedirectCookie(cookies);
		throw redirect(302, '/signin');
	}

	const form = await superValidate(mainSchema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, fetch }) => {
		try {
			const {
				user: { uid }
			} = locals;

			if (!uid) throw error(400, 'Cannot create recipe without author');

			const form = await superValidate(request.clone(), mainSchema);

			const { valid } = form;
			if (!valid) {
				throw error(400, 'Invalid data submitted');
			}

			// check if file is uploaded
			const file = (await request.clone().formData()).get('file') as File | null;
			const fileExists = file?.size !== 0;
			if (!fileExists) {
				return fail(400, {
					form,
					error: 'No image attached. Please upload an image for your recipe'
				});
			}

			// upload image to cloudinary
			const formData = await request.clone().formData();
			const req = await fetch('/api/images', { method: 'POST', body: formData });
			const { public_id } = (await req.json()) as { public_id: string };

			// update image_src with public_id
			form.data.image_src = public_id;

			// create recipe
			await addRecipe(form.data, uid);

			return { form };
		} catch (e) {
			throw error(400, 'Something went wrong');
		}
	}
};
