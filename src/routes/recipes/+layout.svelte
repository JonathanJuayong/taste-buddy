<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if $page.url.pathname === '/recipes'}
		<title>Recipes | Taste Buddy</title>
	{/if}
</svelte:head>

<slot />
