import { getUserById, updateUser } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';
import { superValidate } from 'sveltekit-superforms/client';
import { userSchema } from '$lib/formSchema';

export const load = (async ({ locals, cookies }) => {
	const {
		user: { uid }
	} = locals;

	const user = await getUserById(uid);
	const form = await superValidate(user, userSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	async default({ request, locals, fetch }) {
		const form = await superValidate(request.clone(), userSchema);
		const {
			data: { bio, name, profile_picture }
		} = form;

		const {
			user: { uid }
		} = locals;

		if (!uid) {
			throw error(400, 'uid cannot be null or undefined');
		}

		try {
			const data = await request.clone().formData();
			const file = data.get('file') as File | null;
			const previousImage = data.get('previousImage') as string | null;

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
				await updateUser(uid, name, bio, public_id);
			} else {
				await updateUser(uid, name, bio, profile_picture);
			}
		} catch (e) {
			throw error(400, `Something went wrong: ${e}`);
		}

		return { form };
	}
};
