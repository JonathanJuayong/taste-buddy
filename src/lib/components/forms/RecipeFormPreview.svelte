<script lang="ts">
	import { getContext } from 'svelte';
	import UploadWidget from '../UploadWidget.svelte';
	import type { FormData } from '$lib/types';

	const { form } = getContext<FormData>('formData');

	export let imageFile: File | null;
	export let previousImage: string | null;
</script>

<section class="grid gap-4">
	<h2 class="h2">Preview</h2>
	<p>
		Summary of everything you've written. Make sure to double-check the details! Don't forget to
		include an image for your recipe
	</p>
</section>
<UploadWidget
	imageSrc={$form.image_src}
	on:imageChange={(e) => {
		imageFile = e.detail;
		previousImage = $form.image_src;
	}}
/>
<section class="mb-6">
	<h2 class="h2 mb-2">{$form.name}</h2>
	<p>{$form.description}</p>
	<ul class="flex gap-4 text-xs">
		<li class="border-r-[1px] pr-4">Serves: {$form.serves}</li>
		<li class="border-r-[1px] pr-4">Cook: {$form.cook_time} mins</li>
		<li>Prep: {$form.prep_time} mins</li>
	</ul>
</section>
<section class="mb-6">
	<h3 class="h3">Ingredients</h3>
	<ul>
		{#each $form.ingredients as { qty, unit, item }}
			<li>{qty} {unit} {item}</li>
		{/each}
	</ul>
</section>
<section>
	<h3 class="h3">Steps</h3>
	<ol>
		{#each $form.steps as { step }, i}
			<li>{i + 1}. {step}</li>
		{/each}
	</ol>
</section>
