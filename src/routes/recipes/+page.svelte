<script lang="ts">
	import { enhance } from '$app/forms';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let recipes = data.recipes;

	$: {
		recipes = [...recipes, ...(form?.recipes ?? [])];
	}
	$: next = recipes?.at(-1)?.id;
</script>

<ul class="grid gap-6">
	{#each recipes as recipe}
		<RecipePreview href="recipes/{recipe.id}" {recipe} />
	{/each}
</ul>

<form method="POST" class="flex justify-between mt-10" use:enhance>
	{#if !form?.isLastPage && !data.isLastPage}
		<button class="btn variant-filled-primary w-full" name="value" value={next}>
			Load More Recipes
		</button>
	{/if}
</form>
