<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import PlusIcon from '~icons/lucide/plus';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { ProgressRadial, SlideToggle, toastStore } from '@skeletonlabs/skeleton';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let toggleDelete = false;
	let value = '';
	let isFetching = false;

	$: ({ recipes } = data);
	$: recipesFetched = recipes;
	$: lastSeenId = recipesFetched?.at(-1)?.id ?? 1_000_000;
	$: {
		recipesFetched = recipesFetched.concat(form?.recipes ?? []);
	}
	$: stopFetching = (form?.recipes?.length ?? 0) < (form?.resultsPerPage ?? 0);

	const isLoading = writable(false);
	setContext('isLoading', isLoading);
</script>

<SearchBar bind:value action={$page.url.pathname} />

{#if recipesFetched && recipesFetched.length === 0}
	<article class="text-center py-20 space-y-4">
		<p class="h2">You don't have any recipes yet</p>
		<p>Click the button below to create your first recipe</p>
		<a href="/app/create" class="btn variant-filled-primary">
			Create New Recipe <PlusIcon class="ml-2" />
		</a>
	</article>
{:else}
	<SlideToggle size="sm" name="toggle delete" bind:checked={toggleDelete}>
		Toggle Delete
	</SlideToggle>

	<div class="grid sm:grid-cols-2 gap-6 mt-6">
		<a
			href="/app/create"
			class="rounded-3xl max-w-4xl outline-dashed aspect-video outline-surface-400 relative overflow-hidden flex flex-col place-items-center place-content-center"
		>
			Create a new recipe +
		</a>
		{#each recipesFetched as recipe (recipe.id)}
			<RecipeCard {toggleDelete} {recipe} />
		{/each}
	</div>

	<form
		method="POST"
		class="mx-auto my-16"
		action={$page.url.pathname}
		use:enhance={({ formData }) => {
			isFetching = true;
			formData.append('lastSeenId', `${lastSeenId}`);
			return async ({ result }) => {
				if (result.type === 'error') {
					toastStore.trigger({
						message: 'Something went wrong. Please try again or check your internet connection.'
					});
				}
				applyAction(result);
				isFetching = false;
			};
		}}
	>
		{#if !stopFetching}
			<button class="btn variant-soft-secondary" disabled={isFetching}>
				{#if isFetching}
					<ProgressRadial
						stroke={100}
						width="w-6"
						meter="stroke-surface-500"
						track="stroke-surface-500/30"
					/>
				{:else}
					Fetch older recipes
				{/if}
			</button>
		{:else}
			<p class="text-center">No more recipes to be fetched</p>
		{/if}
	</form>
{/if}

<a
	href="/app/create"
	class="btn aspect-square rounded-full variant-filled-primary fixed bottom-8 right-8 sm:hidden"
	aria-label="create new recipe"
>
	<PlusIcon />
</a>
