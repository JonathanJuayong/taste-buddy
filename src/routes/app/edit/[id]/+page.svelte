<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import RecipeForm from '$lib/components/forms/RecipeForm.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { confirmModal } from '$lib/utils';
	import ButtonWithSpinner from '$lib/components/ButtonWithSpinner.svelte';

	export let data: PageData;
	let isLoading = false;

	const { form, editable } = data;
	$: recipe = data.recipe;
</script>

<title>{recipe?.name ?? 'Recipe not found'}</title>

{#if recipe && editable}
	<article class="grid gap-6">
		<RecipeForm
			actionUrl="{$page.url.pathname}?/update"
			formProp={form}
			onResult={async () => await goto('/app')}
		/>
		<form
			method="POST"
			action="{$page.url.pathname}?/delete"
			use:enhance={async ({ cancel, formData }) => {
				isLoading = true;
				const response = await confirmModal(
					`Delete Recipe: ${recipe?.name}`,
					'Are you sure you want to delete this recipe?'
				);
				formData.append('publicId', recipe?.image_src ?? '');
				if (response) {
					return async ({ update }) => {
						await update();
						toastStore.trigger({
							message: `${recipe?.name} has been successfully deleted`,
							background: 'variant-filled-primary'
						});
					};
				} else {
					cancel();
				}
			}}
		>
			<ButtonWithSpinner
				{isLoading}
				variantDefault="variant-outline-error"
				variantLoading="variant-outline-surface"
			>
				Delete
			</ButtonWithSpinner>
		</form>
		<a href={isLoading ? '' : '/app'} class="btn variant-outline-tertiary"> Cancel Edit </a>
	</article>
{:else if !recipe}
	<h2>Oops... We couldn't find that recipe.</h2>
{:else if !editable}
	<h2>Oops... We couldn't find that recipe.</h2>
{/if}
