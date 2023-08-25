<script lang="ts">
	import type { PageData } from './$types';
	import RecipeForm from '$lib/components/forms/RecipeForm.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { applyAction } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
</script>

<RecipeForm
	formProp={data.form}
	actionUrl={$page.url.pathname}
	onResult={async ({ result }) => {
		if (result.type === 'error') {
			toastStore.trigger({
				message:
					'Something went wrong while creating the recipe. Please try again or double-check your internet connection.'
			});
		}
		applyAction(result);
		toastStore.trigger({
			message: 'Successfully created recipe!'
		});
		await goto('/app');
	}}
/>
