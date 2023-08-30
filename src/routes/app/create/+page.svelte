<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import RecipeForm from '$lib/components/forms/RecipeForm.svelte';
	import { page } from '$app/stores';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.error) {
			toastStore.trigger({
				message: form.error,
				background: 'variant-filled-error'
			});
		}
	}
</script>

<RecipeForm formProp={data.form} actionUrl={$page.url.pathname} redirectUrl="/app" />
