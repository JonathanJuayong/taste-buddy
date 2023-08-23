<script lang="ts">
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { ProgressRadial, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import XIcon from '~icons/lucide/x';
	import type { mainSchema } from '$lib/formSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ActionResult } from '@sveltejs/kit';
	import UploadWidget from './UploadWidget.svelte';
	import { focus, generateRandomId, moveItemTo } from '$lib/utils';
	import SortableList from './SortableList.svelte';

	export let formProp: SuperValidated<typeof mainSchema>;
	export let actionUrl: string;
	export let onResult: (event: {
		result: ActionResult;
		formEl: HTMLFormElement;
		cancel: () => void;
	}) => void;

	let imageFile: File | null;
	let isUploading = false;
	let previousImage: string | null = null;

	const formData = superForm(formProp, {
		dataType: 'json',
		onSubmit: ({ formData }) => {
			isUploading = true;
			if (imageFile) {
				formData.append('file', imageFile);
				formData.append('previousImage', previousImage ?? '');
			}
		},
		onResult
	});
	const { form, errors, constraints, enhance } = formData;

	function addIngredient() {
		$form.ingredients = [...$form.ingredients, { item: '', qty: 1, unit: '' }];
	}
	function removeIngredient(index: number) {
		return () => {
			$form.ingredients = $form.ingredients.filter((_, i) => i !== index);
		};
	}
	function addStep() {
		$form.steps = [...$form.steps, { id: generateRandomId(), step: '' }];
	}
	function removeStep(index: number) {
		return () => ($form.steps = $form.steps.filter((_, i) => i !== index));
	}

	let activeTab = 0;
	const tabs = [
		{ name: 'info', label: 'Info' },
		{ name: 'items', label: 'Items' },
		{ name: 'steps', label: 'Steps' },
		{ name: 'preview', label: 'Preview' }
	];

	function prevTab() {
		if (activeTab === 0) return;
		activeTab--;
	}
	function nextTab() {
		if (activeTab === tabs.length - 1) return;
		activeTab++;
	}

	$: deleteIngredientBtnIsShown = $form.ingredients.length > 1;
	$: deleteStepBtnIsShown = $form.steps.length > 1;
</script>

<!-- <SuperDebug data={$form} /> -->

<form method="POST" action={actionUrl} class="grid" use:enhance>
	<TabGroup class="mb-8" regionPanel="grid gap-4" justify="justify-between">
		{#each tabs as { name, label }, i}
			<Tab bind:group={activeTab} {name} value={i}>{label}</Tab>
		{/each}
		<svelte:fragment slot="panel">
			{#if activeTab === 0}
				<LabeledInput
					name="name"
					type="text"
					error={$errors.name}
					bind:value={$form.name}
					{...$constraints.name}
				/>
				<LabeledInput
					name="description"
					type="text"
					error={$errors.description}
					bind:value={$form.description}
					{...$constraints.description}
				/>
				<div class="grid grid-cols-3 gap-4">
					<LabeledInput
						name="serves"
						type="number"
						error={$errors.serves}
						bind:value={$form.serves}
						{...$constraints.serves}
					/>
					<LabeledInput
						name="cookTime"
						label="cook time"
						type="number"
						error={$errors.cook_time}
						bind:value={$form.cook_time}
						{...$constraints.cook_time}
					/>
					<LabeledInput
						name="prepTime"
						label="prep time"
						type="number"
						error={$errors.prep_time}
						bind:value={$form.prep_time}
						{...$constraints.prep_time}
					/>
				</div>
			{:else if activeTab === 1}
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
				<button
					class="btn variant-outline-primary mt-8 w-full"
					type="button"
					on:click={addIngredient}
				>
					Add
				</button>
			{:else if activeTab === 2}
				<SortableList
					itemListWithId={$form.steps}
					onDragEnd={({ offsetY, indexOffset, i }) => {
						if (offsetY > 0) {
							$form.steps = moveItemTo($form.steps, i, i + indexOffset);
						} else {
							$form.steps = moveItemTo($form.steps, i, i - indexOffset);
						}
					}}
					let:i
				>
					<LabeledInput
						name="steps"
						label={`Step #${i + 1}`}
						type="text"
						error={$errors.steps?.[i].step}
						bind:value={$form.steps[i].step}
						{...$constraints.steps}
					/>
					{#if deleteStepBtnIsShown}
						<button class="absolute top-2 right-2" type="button" on:click={removeStep(i)}>
							<XIcon class="text-error-900" />
						</button>
						<div
							class="handle absolute border-t-4 rounded-full w-20 left-0 mx-auto right-0 top-5 cursor-move"
						/>
					{/if}
				</SortableList>
				<button class="btn variant-outline-primary mt-8 w-full" type="button" on:click={addStep}>
					Add
				</button>
			{:else if activeTab === 3}
				<UploadWidget
					imageSrc={$form.image_src}
					on:imageChange={(e) => {
						imageFile = e.detail;
						previousImage = $form.image_src;
					}}
				/>
				<div class="mb-6">
					<h2 class="h2 mb-2">{$form.name}</h2>
					<p>{$form.description}</p>
					<ul class="flex gap-4 text-xs">
						<li class="border-r-[1px] pr-4">Serves: {$form.serves}</li>
						<li class="border-r-[1px] pr-4">Cook: {$form.cook_time} mins</li>
						<li>Prep: {$form.prep_time} mins</li>
					</ul>
				</div>
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
			{/if}
		</svelte:fragment>
	</TabGroup>
	<div class="grid grid-cols-2 gap-6 border-t-[1px] border-surface-500 pt-8">
		<button
			disabled={activeTab === 0}
			class="btn variant-filled-tertiary"
			type="button"
			on:click={prevTab}>Prev</button
		>
		{#if activeTab === tabs.length - 1}
			<button class="btn variant-filled-primary" disabled={isUploading} type="submit">
				{#if isUploading}
					<ProgressRadial
						stroke={120}
						class="ml-4"
						width="w-6"
						meter="stroke-slate-500"
						track="stroke-slate-500/30"
					/>
				{:else}
					Submit
				{/if}
			</button>
		{:else}
			<button class="btn variant-filled-tertiary" type="button" on:click={nextTab}>Next</button>
		{/if}
	</div>
</form>
