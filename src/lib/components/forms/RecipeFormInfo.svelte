<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms/client';
	import LabeledInput from '../LabeledInput.svelte';
	import { getContext } from 'svelte';
	import type { ZodValidation } from 'sveltekit-superforms';
	import type { mainSchema } from '$lib/formSchema';

	type FormData = SuperForm<ZodValidation<typeof mainSchema>, unknown>;
	const { form, errors, constraints } = getContext<FormData>('formData');
</script>

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
