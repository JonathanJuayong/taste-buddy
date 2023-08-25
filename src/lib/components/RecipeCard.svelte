<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { RecipeCard } from '$lib/types';
	import { confirmModal } from '$lib/utils';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';
	import type { Writable } from 'svelte/store';
	import XIcon from '~icons/lucide/x';

	export let recipe: RecipeCard;
	export let toggleDelete: boolean;

	const isLoading = getContext<Writable<boolean>>('isLoading');
	const { name, image_src: src, id } = recipe;
	const effects = [{ opacity: 50 }, { blur: '500' }];

	function onDeleteHandler(id: number) {
		return async () => {
			$isLoading = true;
			const publicId = recipe.image_src;
			console.log('clocked');
			const confirm = await confirmModal(
				`Delete Recipe - ${recipe.name}`,
				'Are you sure you want to delete this recipe?'
			);

			if (confirm) {
				const formData = new FormData();
				formData.append('id', `${id}`);
				formData.append('publicId', publicId);

				await fetch('/api/recipes', {
					method: 'delete',
					body: formData
				});

				invalidateAll();
				$isLoading = false;
				toastStore.trigger({
					message: 'Recipe has been successfully deleted'
				});
			} else {
				$isLoading = false;
			}
		};
	}
</script>

<article class="card max-w-4xl overflow-hidden relative">
	<a href="/app/edit/{id}">
		<CldImage
			height=""
			width="1000"
			alt={name}
			aspectRatio={16 / 9}
			{src}
			class="bg-black"
			{effects}
		/>
		<p class="absolute bottom-5 left-5 h3 font-bold">{name}</p>
	</a>
	{#if toggleDelete}
		<button
			disabled={$isLoading}
			on:click={onDeleteHandler(recipe.id)}
			class="btn-icon variant-filled-error absolute top-4 right-4"
			aria-label="delete recipe"
		>
			{#if $isLoading}
				<ProgressRadial
					stroke={100}
					width="w-6"
					meter="stroke-surface-500"
					track="stroke-surface-500/30"
				/>
			{:else}
				<XIcon class="text-error-200" />
			{/if}
		</button>
	{/if}
</article>
