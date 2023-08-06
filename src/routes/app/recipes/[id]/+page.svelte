<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { CldImage } from 'svelte-cloudinary';

	export let data: PageData;
	const { form, editable } = data;
	$: recipe = data.recipe;

	let editMode = false;
</script>

<title>{recipe?.name ?? 'Recipe not found'}</title>

{#if recipe}
	{#if editMode && form}
		<article class="grid gap-6">
			<RecipeForm
				actionUrl="{$page.url.pathname}?/update"
				formProp={form}
				onResult={() => (editMode = false)}
			/>
			<button class="btn variant-outline-tertiary" on:click={() => (editMode = false)}>
				Cancel Edit
			</button>
		</article>
	{:else}
		<article class="grid gap-6">
			<section>
				<CldImage
					class="mb-4"
					height=""
					width="1000"
					alt={recipe.name}
					aspectRatio={1.0}
					src={recipe.image_src}
				/>
				<h2 class="h1 pb-2">{recipe.name}</h2>
				<p>{recipe.description}</p>
				<ul class="flex gap-4 text-xs">
					<li class="border-r-[1px] pr-4">Serves: {recipe.serves}</li>
					<li class="border-r-[1px] pr-4">Cook: {recipe.cook_time} mins</li>
					<li>Prep: {recipe.prep_time} mins</li>
				</ul>
			</section>
			<section>
				<h3 class="h3">Ingredients:</h3>
				<ul>
					{#each recipe.ingredients as { qty, unit, item }}
						<li>{qty} {unit} {item}</li>
					{/each}
				</ul>
			</section>

			<section>
				<h3 class="h3">Steps:</h3>
				<ol>
					{#each recipe.steps as step, i}
						<li>{i + 1}. {step}</li>
					{/each}
				</ol>
			</section>
			{#if editable}
				<button class="btn variant-filled-primary" on:click={() => (editMode = true)}>
					Edit Recipe
				</button>
				<form method="POST" action="{$page.url.pathname}?/delete">
					<input type="hidden" value={form?.data.id} />
					<button class="btn variant-outline-error w-full"> Delete Recipe </button>
				</form>
			{/if}
		</article>
	{/if}
{:else}
	<h2>Oops... We couldn't find that recipe.</h2>
{/if}
