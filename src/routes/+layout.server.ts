import { getUserById } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const {
		user: { uid }
	} = locals;
	const details = await getUserById(uid ?? '');

	return {
		profile: {
			id: details?.id,
			profile_picture: details?.profile_picture,
			name: details?.name
		}
	};
}) satisfies LayoutServerLoad;
