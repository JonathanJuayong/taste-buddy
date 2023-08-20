<script lang="ts">
	import type { PageData } from './$types';
	import PlusIcon from '~icons/lucide/plus';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	export let data: PageData;
	const { recipes } = data;
</script>

<div class="grid sm:grid-cols-2 gap-6 items-center h-full">
	{#if recipes.length === 0}
		<article class="text-center space-y-4">
			<p class="h2">You don't have any recipes yet</p>
			<p>Click the button below to create your first recipe</p>
			<a href="/app/create" class="btn variant-filled-primary"
				>Create New Recipe<PlusIcon class="ml-2" /></a
			>
		</article>
	{:else}
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	{/if}
</div>
<a
	href="/app/create"
	class="btn aspect-square rounded-full variant-filled-primary fixed bottom-8 right-8"
>
	<PlusIcon />
</a>
