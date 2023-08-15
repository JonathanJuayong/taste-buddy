<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import type { PageData } from '../$types';

	export let data: PageData;
	const { recipe, editable } = data;
</script>

{#if recipe}
	<head>
		<title>{recipe.name}</title>
	</head>
	<article class="grid gap-12">
		<section class="grid gap-4">
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
		<section class="grid gap-4">
			<h3 class="h3">Ingredients:</h3>
			<ul>
				{#each recipe.ingredients as { qty, unit, item }}
					<li>{qty} {unit} {item}</li>
				{/each}
			</ul>
		</section>

		<section class="grid gap-4">
			<h3 class="h3">Steps:</h3>
			<ol>
				{#each recipe.steps as { step }, i}
					<li>{i + 1}. {step}</li>
				{/each}
			</ol>
		</section>
		{#if editable}
			<a href="/app/edit/{recipe.id}" class="btn variant-filled-primary"> Edit Recipe </a>
		{/if}
	</article>
{:else}
	<head>
		<title>Recipe does not exist</title>
	</head>
	<article class="">
		<h2>Oops... We couldn't find that recipe</h2>
	</article>
{/if}
