<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import type { PageData } from './$types';
	import RefreshIcon from '~icons/lucide/refresh-cw';
	import SearchIcon from '~icons/lucide/search';
	import { page } from '$app/stores';
	import type { MainSchema } from '$lib/formSchema';

	export let data: PageData;

	$: ({ recipes, lastSeenId, resultsPerPage, isLastPage } = data);

	let searchQuery: string;

	$: idForFetchingNewRecipes = lastSeenId;
	$: continueFetching = !isLastPage;
	$: recipesFetched = recipes;
	$: href = $page.url.searchParams.get('search')
		? `${$page.url.pathname}?search=${searchQuery}&items=${
				recipesFetched.length + resultsPerPage
		  }&id=${(recipesFetched.at(0)?.id ?? 0) + 1}`
		: `${$page.url.pathname}?items=${recipesFetched.length + resultsPerPage}&id=${
				(recipesFetched.at(0)?.id ?? 0) + 1
		  }`;

	function fetchMoreRecipes(searchQuery: string, lastSeenId: number, resultsPerPage: number) {
		return async () => {
			const body = {
				searchQuery: searchQuery ?? '',
				lastSeenId,
				resultsPerPage
			};

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

			continueFetching = !data.isLastPage;
			idForFetchingNewRecipes = data.lastId;
			recipesFetched = [...recipesFetched, ...data.recipes];

			window.history.pushState({ path: $page.url.pathname }, '', href);
		};
	}
</script>

<form
	method="get"
	action={$page.url.pathname}
	class="mb-6 grid grid-cols-7 place-items-end justify-between"
>
	<label class="col-span-6">
		<span class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm">
			Search Recipes
		</span>
		<input
			name="search"
			bind:value={searchQuery}
			placeholder="Type a recipe name here"
			class="input"
			type="text"
		/>
	</label>
	<button class="btn-icon variant-filled-primary col-span-1" aria-label="search button">
		<SearchIcon />
	</button>
</form>

<a href="/recipes" data-sveltekit-reload class="btn w-full variant-filled-primary mb-6">
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
	<button
		class="btn variant-outline-primary w-full my-6"
		on:click={fetchMoreRecipes(searchQuery, idForFetchingNewRecipes, resultsPerPage)}
	>
		Fetch More Recipes
	</button>
{:else}
	<p class="text-center mx-auto my-6">No more recipes to fetch</p>
{/if}
