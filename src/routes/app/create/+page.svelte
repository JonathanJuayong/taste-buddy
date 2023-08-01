<script lang="ts">
	import type { PageData } from './$types';
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	export let data: PageData;
</script>

<!-- <SuperDebug data={$form} /> -->

<RecipeForm formProp={data.form} />
