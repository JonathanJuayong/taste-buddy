<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { CldImage } from 'svelte-cloudinary';

	export let data: PageData;
	const { form, editable } = data;
	$: recipe = data.recipe;

	let editMode = false;
</script>

<title>{recipe?.name ?? 'Recipe not found'}</title>

{#if recipe && editable}
	<article class="grid gap-6">
		<RecipeForm
			actionUrl="{$page.url.pathname}?/update"
			formProp={form}
			onResult={() => (editMode = false)}
		/>
		<a href="/app" class="btn variant-outline-tertiary" on:click={() => (editMode = false)}>
			Cancel Edit
		</a>
	</article>
{:else if !recipe}
	<h2>Oops... We couldn't find that recipe.</h2>
{:else if !editable}
	<h2>Oops... We couldn't find that recipe.</h2>
{/if}
