<script lang="ts">
	import { enhance } from '$app/forms';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import type { MainSchema } from '$lib/formSchema';
	import { onMount } from 'svelte';
	import RefreshIcon from '~icons/lucide/refresh-cw';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	const recipeStore = localStorageStore<MainSchema[]>('recipes', []);

	onMount(() => {
		if ($recipeStore.length === 0) {
			$recipeStore = data.recipes;
		}
	});

	$: {
		$recipeStore = [...$recipeStore, ...(form?.recipes ?? [])];
	}
	$: next = $recipeStore?.at(-1)?.id ?? 1_000_000;

	async function handleRefresh() {
		await invalidateAll();
		localStorage.removeItem('recipes');
		location.reload();
	}
</script>

<button class="btn-icon variant-filled-primary mb-6" on:click={handleRefresh}>
	<RefreshIcon class="" />
</button>

<ul class="grid gap-6">
	{#each $recipeStore as recipe}
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
