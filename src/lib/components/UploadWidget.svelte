<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';
	import UploadIcon from '~icons/mdi/upload';

	let files: FileList;
	let Preview: HTMLImageElement | null = null;
	let error: string | null;
	export let imageSrc: string | null = null;

	const dispatch = createEventDispatcher();

	async function onChangeHandler(e: Event) {
		error = null;
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {
			dispatch('imageChange', file);
			Preview = new Image();
			Preview.onerror = () => {
				error = `${file.name} cannot be loaded as image. Please double-check the file type.`;
			};
			Preview.src = URL.createObjectURL(file);
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

	{#if !Preview}
		<CldImage
			class="mb-4"
			height=""
			width="900"
			alt="preview"
			aspectRatio={16 / 9}
			src={imageSrc ?? ''}
		/>
	{/if}

	{#if Preview && !error}
		<div class="grid place-items-center">
			<img class="aspect-video w-full object-contain" src={Preview.src} alt="preview" />
		</div>
	{/if}

	<FileButton
		button="variant-outline-secondary w-full"
		name="file"
		bind:files
		on:change={onChangeHandler}
	>
		Upload an image <UploadIcon class="ml-2" />
	</FileButton>
</div>
