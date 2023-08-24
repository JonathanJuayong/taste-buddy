<script lang="ts">
	import { getContext } from 'svelte';
	import LabeledInput from '../LabeledInput.svelte';
	import { focus } from '$lib/utils';
	import XIcon from '~icons/lucide/x';
	import type { FormData } from '$lib/types';

	const { form, errors, constraints } = getContext<FormData>('formData');

	function addIngredient() {
		$form.ingredients = [...$form.ingredients, { item: '', qty: 1, unit: '' }];
	}
	function removeIngredient(index: number) {
		return () => {
			$form.ingredients = $form.ingredients.filter((_, i) => i !== index);
		};
	}

	$: deleteIngredientBtnIsShown = $form.ingredients.length > 1;
</script>

<section class="grid gap-4">
	<h2 class="h2">Ingredients</h2>
	<p>List down all the ingredients needed for your recipe</p>
	{#each $form.ingredients as _, i}
		<div class="grid grid-cols-4 gap-6 relative" use:focus={i}>
			<LabeledInput
				name="qty"
				type="number"
				error={$errors.ingredients?.[i].qty}
				bind:value={$form.ingredients[i].qty}
				{...$constraints.ingredients?.qty}
			/>
			<LabeledInput
				name="unit"
				type="text"
				error={$errors.ingredients?.[i].unit}
				bind:value={$form.ingredients[i].unit}
				{...$constraints.ingredients?.unit}
			/>
			<div class="col-span-2">
				<LabeledInput
					name="item"
					type="text"
					error={$errors.ingredients?.[i].item}
					bind:value={$form.ingredients[i].item}
					{...$constraints.ingredients?.item}
				/>
			</div>
			{#if deleteIngredientBtnIsShown}
				<button class="absolute top-2 right-2" type="button" on:click={removeIngredient(i)}>
					<XIcon class="text-error-900" />
				</button>
			{/if}
		</div>
	{/each}
	<button class="btn variant-outline-primary mt-8 w-full" type="button" on:click={addIngredient}>
		Add
	</button>
</section>
