<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import type { PageData } from './$types';
	import EditIcon from '~icons/mdi/pencil';
	import { CldImage } from 'svelte-cloudinary';
	import type { MainSchema } from '$lib/formSchema';
	import { tick } from 'svelte';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';

	let listElement: HTMLUListElement;
	let continueFetching = true;
	let isFetching = false;

	export let data: PageData;
	$: ({
		user: { id: authorId, name, bio, profile_picture },
		recipes,
		resultsPerPage,
		editable
	} = data);

	$: recipesShown = recipes as MainSchema[];
	$: lastSeenId = recipesShown?.at(-1)?.id ?? 1_000_000;

	async function fetchMoreRecipes() {
		try {
			isFetching = true;
			const searchQuery = '';
			const req = await fetch('/api/recipes', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					searchQuery,
					lastSeenId,
					resultsPerPage,
					authorId
				})
			});
			const { recipes, isLastPage } = (await req.json()) as {
				recipes: MainSchema[];
				isLastPage: boolean;
			};

			recipesShown = [...recipesShown, ...recipes];

			await tick();

			const ulChildren = Array.from(listElement.children);
			const lastLiElement = ulChildren.at((recipes.length + 1) * -1) as HTMLLIElement;
			console.log(lastLiElement);
			lastLiElement.scrollIntoView();

			continueFetching = !isLastPage;
			isFetching = false;
		} catch (error) {
			toastStore.trigger({
				message: 'Something went wrong when trying to fetch more recipes. Please try again.'
			});
			isFetching = false;
		}
	}
</script>

<svelte:head>
	<title>{name} | Taste Buddy</title>
</svelte:head>

<div class="grid md:grid-cols-2 items-center gap-4 mb-4">
	<section class="grid gap-4 place-items-center">
		<CldImage
			height=""
			width="350"
			alt={name}
			aspectRatio={1}
			src={profile_picture}
			class="rounded-full"
		/>
		<div class="flex gap-2">
			<h1 class="h1 text-center relative">{name}</h1>
			{#if editable}
				<a class="anchor" href="/app/profile">
					<EditIcon />
				</a>
			{/if}
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="uppercase font-bold text-secondary-500 opacity-50 text-sm">About Me</h2>
		<p>{bio}</p>
	</section>
</div>

<section class="grid gap-4 relative">
	<h2 class="uppercase font-bold text-secondary-500 opacity-50 text-sm">Recipes:</h2>
	<div class="snap-x scroll-smooth snap-mandatory overflow-x-auto">
		<ul bind:this={listElement} class="flex gap-4 sm:gap-8 pb-6">
			{#each recipesShown as recipe}
				<li class="shrink-0 snap-start w-[90%] sm:w-[80%] card">
					<RecipePreview href="/recipes/{recipe.id}" {...recipe} />
				</li>
			{/each}
			{#if continueFetching}
				<li class="self-center">
					<button
						class="btn variant-outline-primary"
						on:click={fetchMoreRecipes}
						disabled={isFetching}
					>
						{#if isFetching}
							<ProgressRadial
								stroke={120}
								class=""
								width="w-7"
								meter="stroke-primary-500"
								track="stroke-primary-500/30"
							/>
						{:else}
							More Recipes
						{/if}
					</button>
				</li>
			{/if}
		</ul>
	</div>
</section>
