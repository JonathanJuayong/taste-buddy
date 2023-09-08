import type { PageServerLoad } from './$types';

// add back page.server.ts file because
// hook does not check url if page.server.ts does not exist
// which allows unauthed user to access this route
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
