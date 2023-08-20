<script lang="ts">
	import type { RecipeCard } from '$lib/types';
	import { CldImage } from 'svelte-cloudinary';

	export let recipe: RecipeCard;
	const { name, image_src: src, id } = recipe;
	const effects = [{ opacity: 50 }, { blur: '500' }];
</script>

<a href="/app/edit/{id}" class="card max-w-4xl relative overflow-hidden">
	<CldImage height="" width="1000" alt={name} aspectRatio={1.0} {src} class="bg-black" {effects} />
	<p class="absolute bottom-5 left-5 h2 font-bold">{name}</p>
</a>
