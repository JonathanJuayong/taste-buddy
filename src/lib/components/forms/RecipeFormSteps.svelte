<script lang="ts">
	import LabeledInput from '../LabeledInput.svelte';
	import { getContext } from 'svelte';
	import SortableList from '../SortableList.svelte';
	import { focus, generateRandomId, moveItemTo } from '$lib/utils';
	import XIcon from '~icons/lucide/x';
	import type { FormData } from '$lib/types';

	const { form, errors, constraints } = getContext<FormData>('formData');

	function addStep() {
		$form.steps = [...$form.steps, { id: generateRandomId(), step: '' }];
	}
	function removeStep(index: number) {
		return () => ($form.steps = $form.steps.filter((_, i) => i !== index));
	}

	$: deleteStepBtnIsShown = $form.steps.length > 1;
</script>

<section class="grid gap-4">
	<h2 class="h2">Steps</h2>
	<p>
		List down all the steps needed to create your recipe. Try to be as descriptive as possible. You
		can rearrange the order of the steps by dragging the handle at the top
	</p>
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
		<div use:focus={i}>
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
		</div>
	</SortableList>
	<button class="btn variant-outline-primary mt-8 w-full" type="button" on:click={addStep}>
		Add
	</button>
</section>
