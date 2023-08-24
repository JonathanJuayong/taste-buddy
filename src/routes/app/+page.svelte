<script lang="ts">
	import type { PageData } from './$types';
	import PlusIcon from '~icons/lucide/plus';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: PageData;
	$: ({ recipes } = data);

	const isLoading = writable(false);
	setContext('isLoading', isLoading);
</script>

{#if recipes.length === 0}
	<article class="text-center py-20 space-y-4">
		<p class="h2">You don't have any recipes yet</p>
		<p>Click the button below to create your first recipe</p>
		<a href="/app/create" class="btn variant-filled-primary">
			Create New Recipe <PlusIcon class="ml-2" />
		</a>
	</article>
{:else}
	<div class="grid sm:grid-cols-2 gap-6 items-center h-full">
		<a
			href="/app/create"
			class="rounded-3xl max-w-4xl outline-dashed aspect-video outline-surface-400 relative overflow-hidden flex flex-col place-items-center place-content-center"
		>
			Create a new recipe +
		</a>
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
{/if}
<a
	href="/app/create"
	class="btn aspect-square rounded-full variant-filled-primary fixed bottom-8 right-8 sm:hidden"
	aria-label="create new recipe"
>
	<PlusIcon />
</a>
