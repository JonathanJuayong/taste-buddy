<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import UploadWidget from '$lib/components/UploadWidget.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import ButtonWithSpinner from '$lib/components/ButtonWithSpinner.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let imageFile: File | null;
	let previousImage: string | null;
	let isLoading = false;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onSubmit({ formData }) {
			isLoading = true;
			formData.append('profile_picture', $form.profile_picture);
			if (imageFile) {
				formData.append('file', imageFile);
				formData.append('previousImage', previousImage ?? '');
			}
		},
		onResult: async (data) => {
			const {
				result: { type }
			} = data;
			isLoading = false;
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
				await goto('/app');
			}
		},
		onError: () => {
			toastStore.trigger({
				message:
					'There was an error with the data submitted for this recipe. Please double check the information submitted and try again.',
				background: 'variant-filled-error'
			});
			isLoading = false;
		}
	});
</script>

<form
	enctype="multipart/form-data"
	action={$page.url.pathname}
	method="post"
	class="mb-20 space-y-10"
	use:enhance
>
	<section class="space-y-4">
		<h2 class="h2">Update Profile</h2>
		<p>
			We're eager to get to know you better! Start by sharing your name, and then a short bio to
			describe yourself. You can include anything you want like interest and hobbies. Finally, don't
			forget to include a picture of yourself!
		</p>
	</section>
	<div>
		<UploadWidget
			rounded
			aspectRatio={1}
			width={400}
			imageSrc={$form.profile_picture}
			on:imageChange={(e) => {
				imageFile = e.detail;
				previousImage = $form.profile_picture;
			}}
		/>
		<LabeledInput
			name="name"
			type="text"
			error={$errors.name}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		<LabeledInput
			name="bio"
			type="textarea"
			error={$errors.bio}
			bind:value={$form.bio}
			{...$constraints.bio}
		/>
		<ButtonWithSpinner btnClasses="mt-5" {isLoading}>Update Profile</ButtonWithSpinner>
	</div>
</form>
