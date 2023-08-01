<script lang="ts">
	import type { PageData } from './$types';
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	export let data: PageData;
</script>

<RecipeForm formProp={data.form} />
