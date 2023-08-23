<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithPopup, OAuthProvider } from 'firebase/auth';
	import GoogleIcon from '~icons/devicon-plain/google';
	import MicrosoftIcon from '~icons/mdi/microsoft';
	import { goto, invalidateAll } from '$app/navigation';
	import ButtonWithSpinner from './ButtonWithSpinner.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';

	type SignInState = 'initial' | 'loading';
	type Providers = 'google' | 'microsoft';
	type Icon = typeof GoogleIcon | typeof MicrosoftIcon;
	type ProviderDetails = {
		name: string;
		authProvider: OAuthProvider;
		Icon: Icon;
	};

	export let state: SignInState = 'initial';
	export let providerName: Providers;

	const providers: Record<Providers, ProviderDetails> = {
		google: {
			name: 'Google',
			authProvider: new OAuthProvider('google.com'),
			Icon: GoogleIcon
		},
		microsoft: {
			name: 'Microsoft',
			authProvider: new OAuthProvider('microsoft.com'),
			Icon: MicrosoftIcon
		}
	};

	const { name, authProvider, Icon } = providers[providerName];

	function signInWith(provider: OAuthProvider) {
		return async () => {
			if (provider.providerId === 'microsoft.com') {
				provider.setCustomParameters({
					prompt: 'consent'
				});
			}
			state = 'loading';
			try {
				const { user } = await signInWithPopup(auth, provider);
				const idToken = await user.getIdToken();
				await fetch('/api/signin', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ idToken })
				});
				await invalidateAll();
				await goto('/app');
				toastStore.trigger({
					message: 'Successfully signed in!',
					background: 'variant-filled-success'
				});
			} catch (error) {
				state = 'initial';
				toastStore.trigger({
					message: 'Sign in failed. Please try again',
					background: 'variant-filled-error'
				});
				console.log(error);
			}
		};
	}
</script>

<ButtonWithSpinner isLoading={state === 'loading'} on:click={signInWith(authProvider)}>
	Sign in with {name}
	<svelte:fragment slot="button-icon">
		<Icon class="ml-2" />
	</svelte:fragment>
</ButtonWithSpinner>
