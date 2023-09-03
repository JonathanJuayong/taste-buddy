<script lang="ts">
	import HomeIcon from '~icons/lucide/home';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>App | Taste Buddy</title>
</svelte:head>

<main class="flex flex-col h-full relative">
	<ul class="breadcrumb-nonresponsive mb-6">
		{#if $page.url.pathname === '/app'}
			<li>
				<p class="flex items-center">
					<HomeIcon class="mr-2" />
					Home
				</p>
			</li>
		{:else}
			<li class="crumb">
				<a href="/app" class="anchor flex items-center">
					<HomeIcon class="mr-2" />
					Home
				</a>
			</li>
		{/if}
		{#if $page.url.pathname.includes('/recipes')}
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<p>Recipes</p>
			</li>
		{/if}
		{#if $page.url.pathname.includes('/create')}
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<a class="anchor" href="/app/recipes">Recipes</a>
			</li>
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<p>Create</p>
			</li>
		{/if}
		{#if $page.url.pathname.includes('/edit')}
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<a class="anchor" href="/app/recipes">Recipes</a>
			</li>
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<p>Edit</p>
			</li>
		{/if}
		{#if $page.url.pathname.includes('/profile')}
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<p>Edit</p>
			</li>
		{/if}
		<li />
	</ul>
	<slot />
</main>
