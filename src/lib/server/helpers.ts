import type { Cookies } from '@sveltejs/kit';

export function createTemporaryRedirectCookie(cookies: Cookies) {
	cookies.set('isRedirected', 'true', {
		httpOnly: false,
		path: '/',
		maxAge: 5
	});
}
