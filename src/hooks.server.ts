import { authAdmin } from '$lib/server/firebase-admin';
import { createTemporaryRedirectCookie } from '$lib/server/helpers';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	if (sessionCookie) {
		try {
			const { uid } = await authAdmin.verifySessionCookie(sessionCookie);
			event.locals.user = { uid };
			console.log('UID has been set in locals');
		} catch (error) {
			console.log("There's been an error here: ", error);
			event.locals.user = { uid: null };
			return resolve(event);
		}
	} else {
		event.locals.user = { uid: null };
	}

	const pathnameIncludesApp = event.url.pathname.includes('/app');
	const userIsNotSignedIn = !event.locals.user.uid;

	if (pathnameIncludesApp && userIsNotSignedIn) {
		createTemporaryRedirectCookie(event.cookies);
		throw redirect(301, '/signin');
	}

	return resolve(event);
};
