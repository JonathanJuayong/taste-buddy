<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import type { PageData } from '../$types';
	import EditIcon from '~icons/mdi/pencil';

	export let data: PageData;
	const { recipe, editable } = data;
</script>

<svelte:head>
	<title>{recipe?.name ?? 'Recipe does not exist'}</title>
</svelte:head>
{#if recipe}
	<article class="space-y-12 mb-20 aspec">
		<CldImage
			height=""
			width="1000"
			alt={recipe.name}
			aspectRatio={16 / 9}
			src={recipe.image_src}
		/>
		<div
			class="relative space-y-12 sm:space-y-0 sm:grid sm:gap-16 sm:grid-cols-2 sm:justify-between"
		>
			<section class="space-y-4">
				<header class="flex gap-2">
					<h2 class="h1">{recipe.name}</h2>
					{#if editable}
						<a href="/app/edit/{recipe.id}" aria-label="Edit button" class="text-primary-700">
							<EditIcon class="" />
						</a>
					{/if}
				</header>
				<p>{recipe.description}</p>
				<ul class="flex gap-4 text-xs">
					<li class="border-r-[1px] pr-4">Serves: {recipe.serves}</li>
					<li class="border-r-[1px] pr-4">Cook: {recipe.cook_time} mins</li>
					<li>Prep: {recipe.prep_time} mins</li>
				</ul>
			</section>
			<div class="space-y-12">
				<section class="grid gap-4">
					<h3 class="h3 text-surface-300 font-extrabold">Ingredients:</h3>
					<ul class="space-y-2">
						{#each recipe.ingredients as { qty, unit, item }}
							<li>{qty} {unit} {item}</li>
						{/each}
					</ul>
				</section>
				<section class="grid gap-4">
					<h3 class="h3 text-surface-300 font-extrabold">Steps:</h3>
					<ol class="space-y-2">
						{#each recipe.steps as { step }, i}
							<li>{i + 1}. {step}</li>
						{/each}
					</ol>
				</section>
			</div>
		</div>
	</article>
{:else}
	<article class="">
		<h2>Oops... We couldn't find that recipe</h2>
	</article>
{/if}
