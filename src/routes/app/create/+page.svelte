<script lang="ts">
	import type { PageData } from './$types';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<RecipeForm formProp={data.form} actionUrl={$page.url.pathname} onResult={() => goto('/app')} />
