<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import RecipeForm from '$lib/components/forms/RecipeForm.svelte';

	export let data: PageData;

	const { form, editable } = data;
	$: recipe = data.recipe;
</script>

<title>{recipe?.name ?? 'Recipe not found'}</title>

{#if recipe && editable}
	<RecipeForm actionUrl="{$page.url.pathname}?/update" formProp={form} redirectUrl="/app" />
{:else if !recipe}
	<h2>Oops... We couldn't find that recipe.</h2>
{:else if !editable}
	<h2>Oops... We couldn't find that recipe.</h2>
{/if}
