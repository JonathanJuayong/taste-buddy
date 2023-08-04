<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithPopup, type AuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';
	import type { PageData } from './$types';
	import GoogleIcon from '~icons/devicon-plain/google';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: uid = data.user.uid;

	function signInWith(provider: AuthProvider) {
		return async () => {
			const { user } = await signInWithPopup(auth, provider);
			const idToken = await user.getIdToken();
			try {
				await fetch('/api/signin', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ idToken })
				});
				goto('/app');
			} catch (error) {
				console.log(error);
			}
		};
	}

	async function logOut() {
		await fetch('/api/signin', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}
</script>

<div class="p-6 space-y-6">
	<p>{uid}</p>
	{#if uid}
		<button class="btn variant-filled-error w-full" on:click={logOut}>Sign Out</button>
	{:else}
		<button
			class="btn variant-filled-primary w-full"
			on:click={signInWith(new GoogleAuthProvider())}
		>
			Sign In With Google <GoogleIcon class="ml-2" />
		</button>
	{/if}
</div>
