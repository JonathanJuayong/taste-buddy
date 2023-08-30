<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { ProgressRadial, Tab, TabGroup, toastStore } from '@skeletonlabs/skeleton';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import RecipeFormInfo from './RecipeFormInfo.svelte';
	import { setContext } from 'svelte';
	import RecipeFormIngredients from './RecipeFormIngredients.svelte';
	import RecipeFormSteps from './RecipeFormSteps.svelte';
	import RecipeFormPreview from './RecipeFormPreview.svelte';
	import { mainSchema } from '$lib/formSchema';
	import { goto } from '$app/navigation';

	export let formProp: SuperValidated<typeof mainSchema>;
	export let actionUrl: string;
	export let redirectUrl: string;

	let imageFile: File | null;
	let isUploading = false;
	let previousImage: string | null = null;

	const formData = superForm(formProp, {
		dataType: 'json',
		validationMethod: 'oninput',
		validators: mainSchema,
		onSubmit: ({ formData }) => {
			isUploading = true;
			if (imageFile) {
				formData.append('file', imageFile);
				formData.append('previousImage', previousImage ?? '');
			}
		},
		onResult: async (data) => {
			const {
				result: { type }
			} = data;
			isUploading = false;
			if (type === 'failure') {
				toastStore.trigger({
					message:
						'Something went wrong when submitting your data. Please double check the information submitted and try again.',
					background: 'variant-filled-error'
				});
			}

			if (type === 'success') {
				toastStore.trigger({
					message: 'Data was submitted successfully!'
				});
				await goto(redirectUrl);
			}
		},
		onError: () => {
			toastStore.trigger({
				message:
					'There was an error with the data submitted for this recipe. Please double check the information submitted and try again.',
				background: 'variant-filled-error'
			});
			isUploading = false;
		}
	});

	const { enhance } = formData;

	setContext('formData', formData);

	let activeTab = 0;
	const tabs = ['Info', 'Items', 'Steps', 'Preview'];

	function prevTab() {
		if (activeTab === 0) return;
		activeTab--;
	}
	function nextTab() {
		if (activeTab === tabs.length - 1) return;
		activeTab++;
	}
</script>

<!-- <SuperDebug data={$form} /> -->

<header class="flex justify-around transition-all">
	{#each tabs as tab, i}
		<p
			class="pb-2 w-full text-sm text-center text-surface-200"
			class:text-surface-700={i > activeTab}
			class:border-b-2={activeTab >= i}
		>
			{i + 1}.
			{tab}
		</p>
	{/each}
</header>

<form
	enctype="multipart/form-data"
	class="md:col-span-2 grid md:grid-cols-3 md:gap-8"
	method="POST"
	action={actionUrl}
	use:enhance
>
	<TabGroup
		class="mb-8 md:col-span-2"
		regionList="border-none"
		regionPanel="grid gap-4"
		justify="justify-between"
	>
		<svelte:fragment slot="panel">
			{#if activeTab === 0}
				<RecipeFormInfo />
			{:else if activeTab === 1}
				<RecipeFormIngredients />
			{:else if activeTab === 2}
				<RecipeFormSteps />
			{:else if activeTab === 3}
				<RecipeFormPreview bind:imageFile bind:previousImage />
			{/if}
		</svelte:fragment>
	</TabGroup>
	<div
		class="grid grid-cols-2 md:grid-cols-1 md:place-content-start gap-6 border-t-[1px] border-surface-500 md:border-none pt-8 md:pt-6"
	>
		<button
			disabled={activeTab === 0}
			class="btn variant-outline-tertiary"
			type="button"
			on:click={prevTab}>Prev</button
		>
		{#if activeTab === tabs.length - 1}
			<button class="btn variant-filled-primary md:-order-1" disabled={isUploading} type="submit">
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
			<button class="btn variant-filled-tertiary md:-order-1" type="button" on:click={nextTab}
				>Next</button
			>
		{/if}
	</div>
</form>
