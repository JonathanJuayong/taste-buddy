<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EmailIcon from '~icons/mdi/email-outline';
	import SignInWithProviderButton from '$lib/components/SignInWithProviderButton.svelte';
	import ButtonWithSpinner from '$lib/components/ButtonWithSpinner.svelte';
	import { FirebaseError } from 'firebase/app';

	export let data: PageData;
	const uid = data.user.uid;

	let email: string;
	let password: string;
	let isLoading = false;

	let errorMessage: string | null = null;

	async function logOut() {
		await fetch('/api/signin', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}

	async function signInWithEmail() {
		errorMessage = null;
		isLoading = true;
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await userCredential.user.getIdToken();
			await fetch('/api/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idToken })
			});
			await goto('/app');
		} catch (error) {
			isLoading = false;

			if (error instanceof FirebaseError) {
				console.log(error.code);
				errorMessage = 'Email or password is incorrect. Please try again.';
			}

			console.log(error);
		}
	}
</script>

<div class="p-6 space-y-6">
	{#if uid}
		<button class="btn variant-filled-error w-full" on:click={logOut}>Sign Out</button>
	{:else}
		<div>
			<label>
				<span
					class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm"
				>
					Email
				</span>
				<input class="input" bind:value={email} />
			</label>
			<label>
				<span
					class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm"
				>
					Password
				</span>
				<input type="password" class="input" bind:value={password} />
			</label>
		</div>
		{#if errorMessage}
			<p class="text-error-900">{errorMessage}</p>
		{/if}
		<ButtonWithSpinner
			variantDefault="variant-filled-secondary"
			variantLoading="variant-outline-secondary"
			{isLoading}
			on:click={signInWithEmail}
		>
			Sign In With Email
			<svelte:fragment slot="button-icon">
				<EmailIcon class="ml-2" />
			</svelte:fragment>
		</ButtonWithSpinner>
		<div class="space-y-6 border-t-[1px] border-surface-500 pt-6">
			<SignInWithProviderButton providerName="google" />
			<SignInWithProviderButton providerName="microsoft" />
		</div>
	{/if}
</div>
