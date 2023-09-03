import { getUserById } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';
import { superValidate } from 'sveltekit-superforms/client';
import { userSchema } from '$lib/formSchema';

export const load = (async ({ locals, cookies }) => {
	const {
		user: { uid }
	} = locals;

	if (!uid) {
		createTemporaryRedirectCookie(cookies);
		throw redirect(302, '/signin');
	}

	const user = await getUserById(uid);
	const form = await superValidate(user, userSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	async default({ request }) {
		const form = await superValidate(request.clone(), userSchema);
	}
};
