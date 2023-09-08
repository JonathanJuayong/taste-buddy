<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import type { PageData } from './$types';

	export let data: PageData;

	const images = ['static/bmizypm4ctfnnmgzuhk7', 'static/mi8wzb7rpnd5j5esracm'];

	$: ({ uid } = data);
</script>

<svelte:head>
	<title>Taste Buddy</title>
</svelte:head>

<main class="grid justify-center max-w-4xl mx-auto text-center gap-4">
	<div class="flex gap-4 justify-center max-w-4xl mx-auto overflow-clip">
		{#each images as src}
			<CldImage
				layout="constrained"
				alt="background image of food"
				width="500"
				quality="100"
				height=""
				aspectRatio={1}
				{src}
			/>
		{/each}
	</div>
	<h1 class="h1">Welcome to Taste Buddy!</h1>
	<p class="text-lg">The easiest way to create recipes and share them with others!</p>
	<div class="flex gap-4 mt-6 justify-center">
		{#if uid}
			<a class="btn variant-filled-primary" href="/app">Go to app</a>
		{:else}
			<a class="btn variant-filled-primary" href="/signin">Sign up</a>
		{/if}
		<a class="btn variant-outline-primary" href="/recipes">View recipes</a>
	</div>
</main>
