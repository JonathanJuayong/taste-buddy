<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, Drawer, Toast, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import XIcon from '~icons/lucide/x';
	import MenuIcon from '~icons/lucide/menu';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({
		user: { uid }
	} = data);

	const drawerSettings: DrawerSettings = {
		id: 'main',
		position: 'left'
	};

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<Toast />

<Drawer
	regionDrawer="p-5 pt-10 relative"
	on:drawer={() => {
		setTimeout(drawerStore.close, 200);
	}}
>
	<ul class="space-y-5">
		<li><a class="text-2xl" href="/app">App</a></li>
		<li><a class="text-2xl" href="/recipes">Recipes</a></li>
		<li><a class="text-2xl" href="/signin">Sign in</a></li>
		{#if uid}
			<li><a class="text-2xl" href="/app/create">Create</a></li>
		{/if}
	</ul>
	<button class="btn absolute top-4 right-2" on:click={() => drawerStore.close()}><XIcon /></button>
</Drawer>

<AppBar
	class="sm:hidden mb-8"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<button on:click={openDrawer} class="btn btn-icon p-1">
			<MenuIcon />
		</button>
	</svelte:fragment>
	<p class="font-extrabold">Taste Buddy</p>
</AppBar>

<div class="px-6">
	<nav class="sm:flex items-center justify-between py-4 mb-6 hidden">
		<p class="font-extrabold">Taste Buddy</p>
		<ul class="flex gap-6 items-center">
			<li><a href="/app">App</a></li>
			<li><a href="/recipes">Recipes</a></li>
			<li>
				<a href="signin">
					{#if uid}
						Sign out
					{:else}
						Sign in
					{/if}
				</a>
			</li>
			{#if uid}
				<li class="variant-outline-primary btn btn-sm">
					<a class="text-primary-700" href="/app/create">Create</a>
				</li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
