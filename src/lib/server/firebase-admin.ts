import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import { getAuth } from 'firebase-admin/auth';
import fb from 'firebase-admin';

try {
	fb.initializeApp({
		credential: fb.credential.cert({
			clientEmail: FB_CLIENT_EMAIL,
			projectId: FB_PROJECT_ID,
			privateKey: FB_PRIVATE_KEY
		})
	});
} catch (error: any) {
	console.error(error);
	if (!/already exists/u.test(error?.message)) {
		console.error('Firebase Admin Error: ', error?.stack);
	}
}

export const authAdmin = getAuth();
