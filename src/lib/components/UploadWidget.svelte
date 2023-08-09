<script lang="ts">
	import { ConicGradient, FileDropzone, type ConicStop } from '@skeletonlabs/skeleton';
	import { CldImage } from 'svelte-cloudinary';
	import { createEventDispatcher } from 'svelte';
	import UploadIcon from '~icons/mdi/upload';

	let files: FileList;
	let Preview: HTMLImageElement | null = null;
	let error: string | null;
	let allowUpload = false;
	let isUploading = false;
	export let imageSrc: string | null = null;

	const dispatch = createEventDispatcher();
	const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/tastebuddies/image/upload';
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];

	async function onChangeHandler(e: Event) {
		error = null;
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {
			Preview = new Image();
			Preview.onerror = () => {
				error = `${file.name} cannot be loaded as image. Please double-check the file type.`;
			};
			allowUpload = false;
			Preview.src = URL.createObjectURL(file);
		}
	}

	async function handleUpload() {
		const file = files[0];
		const uploadPreset = 'k8rblh0o';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', uploadPreset);
		try {
			isUploading = true;
			const request = await fetch(cloudinaryUrl, {
				method: 'POST',
				body: formData
			});
			const response = await request.json();
			dispatch('upload', response['public_id']);
			Preview = null;
			isUploading = false;
		} catch (error) {
			console.log('An error occured when uploading', error);
		}
	}
</script>

<div class="space-y-6 my-2">
	<p class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm">
		Main Image
	</p>

	{#if error}
		<p class="text-error-900">{error}</p>
	{/if}

	{#if imageSrc && !Preview && allowUpload === false}
		<CldImage class="mb-4" height="" width="1000" alt="preview" aspectRatio={1.0} src={imageSrc} />
	{/if}

	{#if Preview && !error && allowUpload === false}
		<div class="grid place-items-center">
			<img src={Preview.src} alt="preview" />
		</div>
	{/if}

	{#if isUploading}
		<ConicGradient stops={conicStops} class="ml-2" width="w-6" spin />
	{/if}

	{#if allowUpload === false}
		{#if Preview && !error}
			<div class="flex justify-between">
				<button
					disabled={isUploading}
					type="button"
					class="btn variant-outline-surface"
					on:click={() => (allowUpload = true)}
				>
					Change Image
				</button>
				<button
					disabled={isUploading}
					class="btn variant-filled-surface"
					type="button"
					on:click={handleUpload}
				>
					Upload Image
				</button>
			</div>
		{:else}
			<button
				disabled={isUploading}
				type="button"
				class="btn variant-outline-surface w-full"
				on:click={() => (allowUpload = true)}
			>
				{imageSrc ? 'Change Image' : 'Upload Image'}
			</button>
		{/if}
	{/if}

	{#if allowUpload}
		<FileDropzone name="file" bind:files on:change={onChangeHandler}>
			<svelte:fragment slot="lead"><UploadIcon class="mx-auto" /></svelte:fragment>
		</FileDropzone>
	{/if}
</div>
