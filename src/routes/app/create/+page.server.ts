import { mainSchema } from '$lib/formSchema';
import { addRecipe } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
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
	default: async ({ request, locals }) => {
		const {
			user: { uid }
		} = locals;

		if (!uid) throw error(400, 'Cannot create recipe without author');

		const form = await superValidate(request, mainSchema);

		await addRecipe(form.data, uid);

		return { form };
	}
};
