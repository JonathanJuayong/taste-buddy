<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import LabeledInput from '$lib/components/LabeledInput.svelte';
	import UploadWidget from '$lib/components/UploadWidget.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance } = superForm(data.form, {});
</script>

<form method="post" class="mb-20 space-y-10" use:enhance>
	<section class="space-y-4">
		<h2 class="h2">Update Profile</h2>
		<p>
			We're eager to get to know you better! Start by sharing your name, and then a short bio to
			describe yourself. You can include anything you want like interest and hobbies. Finally, don't
			forget to include a picture of yourself!
		</p>
	</section>
	<div>
		<UploadWidget rounded aspectRatio={1} width={400} imageSrc={$form.profile_picture} />
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
		<button class="btn mt-10 w-full variant-filled-primary">Update Profile</button>
	</div>
</form>
