<script lang="ts">
	import type { PageData } from './$types';
	import PlusIcon from '~icons/lucide/plus';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	export let data: PageData;
	const { recipes } = data;
</script>

{#if recipes.length === 0}
	<div class="text-center py-20 space-y-4">
		<p class="h2">You don't have any recipes yet</p>
		<p>Click the button below to create your first recipe</p>
		<a href="/app/create" class="btn variant-filled-primary"
			>Create New Recipe<PlusIcon class="ml-2" /></a
		>
	</div>
{:else}
	<div class="grid sm:grid-cols-2 gap-6 items-center h-full">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
{/if}
<a
	href="/app/create"
	class="btn aspect-square rounded-full variant-filled-primary fixed bottom-8 right-8 sm:hidden"
>
	<PlusIcon />
</a>
