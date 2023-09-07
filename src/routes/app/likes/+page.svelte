<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { append } from 'svelte/internal';
	import type { ActionData, PageData } from './$types';
	import HeartIconFilled from '~icons/mdi/cards-heart';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	let isLoading = false;

	$: ({ likedRecipes } = data);
	$: isLastPage = form?.isLastPage ?? false;
	$: shownRecipes = likedRecipes;
	$: lastSeenId = shownRecipes?.at(-1)?.id ?? 1_000_000;
	$: {
		shownRecipes = [...shownRecipes, ...(form?.likedRecipes ?? [])];
	}
</script>

<h1 class="h3 mb-6"><HeartIconFilled class="mr-2 inline" /> Liked Recipes</h1>

{#if shownRecipes.length === 0}
	<section class="text-center space-y-4 mt-10">
		<h2 class="h2">You haven't liked any recipes yet</h2>
		<p>
			Click the <span class="variant-filled-error inline-block rounded-full px-3 py-1 mx-1"
				>Like <HeartIconFilled class="inline" /></span
			> button on any recipe you like and it will show up here.
		</p>
	</section>
{:else}
	<ul class="space-y-6">
		{#each shownRecipes as { id, name, description, serves, cook_time, prep_time, image_src }}
			<li class="card">
				<RecipePreview
					href="/recipes/{id}"
					{name}
					{description}
					{serves}
					{cook_time}
					{prep_time}
					{image_src}
				/>
			</li>
		{/each}
		{#if !isLastPage}
			<li>
				<form
					method="post"
					use:enhance={({ formData }) => {
						isLoading = true;
						formData.append('lastSeenId', `${lastSeenId}`);
						return ({ result }) => {
							applyAction(result);
							isLoading = false;
						};
					}}
				>
					{#if isLoading}
						<ProgressRadial
							stroke={120}
							class="mx-auto my-10"
							width="w-10"
							meter="stroke-primary-500"
							track="stroke-primary-500/30"
						/>
					{:else}
						<button class="btn mx-auto my-20 block variant-outline-primary">Show more</button>
					{/if}
				</form>
			</li>
		{:else}
			<li>
				<p class="my-10 text-center">No more recipes</p>
			</li>
		{/if}
	</ul>
{/if}
