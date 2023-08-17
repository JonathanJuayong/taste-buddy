<script lang="ts">
	import { enhance } from '$app/forms';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { onMount } from 'svelte';
	import RefreshIcon from '~icons/lucide/refresh-cw';
	import { invalidateAll } from '$app/navigation';
	import { recipes, scrollStore } from '../../stores/recipes';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	export let form: ActionData;

	let scrollY: number;

	onMount(async () => {
		if ($recipes.length === 0) {
			$recipes = data.recipes;
		}

		// Check if there is new data to fetch
		const latestIdFromLoadFunction = data?.recipes?.at(0)?.id;

		// Check if latest id from load function is not yet in recipes store
		const newRecipeAvailable = !$recipes?.find(({ id }) => id === latestIdFromLoadFunction);
		if (newRecipeAvailable) {
			toastStore.trigger({
				message:
					'There are new recipes available. Click the "Get Latest Recipes" button to view them',
				background: 'variant-filled-secondary'
			});
		}

		scrollY = $scrollStore;
	});

	onDestroy(() => {
		$scrollStore = scrollY;
	});

	$: {
		$recipes = [...$recipes, ...(form?.recipes ?? [])];
	}

	$: next = $recipes?.at(-1)?.id ?? 1_000_000;

	async function handleRefresh() {
		await invalidateAll();
		localStorage.removeItem('recipes');
		localStorage.removeItem('scroll');
		location.reload();
	}
</script>

<svelte:window bind:scrollY />

<button class="btn w-full variant-filled-primary mb-6" on:click={handleRefresh}>
	Get Latest Recipes <RefreshIcon class="ml-2" />
</button>

<ul class="grid gap-6 scroll-smooth">
	{#each $recipes as recipe}
		<RecipePreview href="recipes/{recipe.id}" {recipe} />
	{/each}
</ul>

<form method="POST" class="flex justify-between mt-10" use:enhance>
	{#if !form?.isLastPage && !data.isLastPage}
		<button class="btn variant-outline-primary w-full" name="value" value={next}>
			Load More Recipes
		</button>
	{:else}
		<p class="mx-auto text-surface-300">No more recipes to load</p>
	{/if}
</form>
