<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import type { PageData } from './$types';
	import RefreshIcon from '~icons/lucide/refresh-cw';
	import { page } from '$app/stores';
	import type { MainSchema } from '$lib/formSchema';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
	import SearchBar from '$lib/components/SearchBar.svelte';

	export let data: PageData;

	$: ({ recipes, lastSeenId, resultsPerPage, isLastPage } = data);

	let searchQuery: string;
	let isLoading = false;
	let href = '';

	$: idForFetchingNewRecipes = lastSeenId;
	$: continueFetching = !isLastPage;
	$: recipesFetched = recipes;

	// generate href to keep track of recipes already fetched in the url
	function generateHref() {
		const withSearch = $page.url.searchParams.get('search');
		const pathname = $page.url.pathname;
		const search = withSearch ? `&search=${searchQuery}` : '';
		const items = `items=${recipesFetched.length}`;
		const id = `id=${(recipesFetched.at(0)?.id ?? 0) + 1}`;

		href = `${pathname}?&${items}&${id}${search}`;
	}

	function fetchMoreRecipes(searchQuery: string, lastSeenId: number, resultsPerPage: number) {
		isLoading = true;
		return async () => {
			const body = {
				searchQuery: searchQuery ?? '',
				lastSeenId,
				resultsPerPage
			};

			try {
				const request = await fetch('/api/recipes', {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				});

				const data = (await request.json()) as {
					recipes: MainSchema[];
					isLastPage: boolean;
					lastId: number;
				};

				isLoading = false;

				continueFetching = !data.isLastPage;
				idForFetchingNewRecipes = data.lastId;
				recipesFetched = [...recipesFetched, ...data.recipes];

				generateHref();
				window.history.pushState({ path: $page.url.pathname }, '', href);
			} catch (error) {
				console.log(error);
				toastStore.trigger({
					message: 'Oops... something went wrong. Try again.',
					background: 'variant-filled-warning'
				});
				isLoading = false;
			}
		};
	}
</script>

<SearchBar bind:value={searchQuery} action={$page.url.pathname} />

<a href="/recipes" data-sveltekit-reload class="btn w-full variant-ringed-primary mb-6">
	Get Latest Recipes <RefreshIcon class="ml-2" />
</a>

<ul class="grid gap-6 scroll-smooth">
	{#each recipesFetched as { id, name, image_src, description, serves, cook_time, prep_time }}
		<RecipePreview
			href="recipes/{id}"
			{name}
			{image_src}
			{description}
			{serves}
			{cook_time}
			{prep_time}
		/>
	{/each}
</ul>

{#if continueFetching}
	{#if isLoading}
		<ProgressRadial
			stroke={120}
			class="mx-auto my-20"
			width="w-16"
			meter="stroke-primary-500"
			track="stroke-primary-500/30"
		/>
	{:else}
		<button
			class="btn mx-auto block my-16 variant-soft-secondary"
			on:click={fetchMoreRecipes(searchQuery, idForFetchingNewRecipes, resultsPerPage)}
		>
			Fetch More Recipes
		</button>
	{/if}
{:else}
	<p class="text-center mx-auto my-16">No more recipes to fetch</p>
{/if}
