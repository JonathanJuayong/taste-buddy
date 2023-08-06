import { authAdmin } from '$lib/server/firebase-admin';

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
	return resolve(event);
};
