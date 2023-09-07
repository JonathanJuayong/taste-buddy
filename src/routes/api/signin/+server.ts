import { authAdmin } from '$lib/server/firebase-admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createUser, getUserById } from '$lib/server/db';

const maxAge = 60 * 60 * 24 * 5 * 1000;
const cookieSessionKey = '__session';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { idToken } = (await request.json()) as { idToken: string };
		const { uid, auth_time } = await authAdmin.verifyIdToken(idToken);

		const user = await getUserById(uid);
		if (!user) {
			await createUser(uid);
		}

		const authIsLessThan5Mins = new Date().getTime() / 1000 - auth_time < 5 * 60;
		if (authIsLessThan5Mins) {
			const cookie = await authAdmin.createSessionCookie(idToken, { expiresIn: maxAge });
			cookies.set(cookieSessionKey, cookie, {
				maxAge,
				httpOnly: true,
				secure: true,
				path: '/'
			});

			console.log('Cookie has been set');
			return json({ status: 'signed in' });
		} else {
			throw error(401, 'Recent Sign-in Required');
		}
	} catch (e) {
		console.log(e);
		throw error(500, JSON.stringify(e));
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete(cookieSessionKey, { path: '/' });
	return json({ status: 'signed out' });
};
