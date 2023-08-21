import { mainSchema } from '$lib/formSchema';
import { addRecipe } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ locals }) => {
	if (!locals.user.uid) {
		throw redirect(301, '/signin');
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
