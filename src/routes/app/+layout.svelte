<script lang="ts">
	import { AppBar, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import MenuIcon from '~icons/lucide/menu';
	import BabyIcon from '~icons/lucide/baby';
	import HomeIcon from '~icons/lucide/home';
	import { page } from '$app/stores';

	const drawerSettings: DrawerSettings = {
		id: 'main',
		position: 'left'
	};

	function getPageName(url: string) {
		switch (url) {
			case '/app': {
				return 'Home';
			}
			case '/app/create': {
				return 'Create';
			}

			default: {
				return 'App';
			}
		}
	}

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<main class="flex flex-col h-full">
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<button on:click={openDrawer} class="btn btn-icon p-1">
				<MenuIcon />
			</button>
		</svelte:fragment>
		<h1 class="h1">{getPageName($page.url.pathname)}</h1>
		<svelte:fragment slot="trail">
			<button class="btn btn-icon p-1">
				<BabyIcon />
			</button>
		</svelte:fragment>
	</AppBar>
	<div class="flex-grow py-6 px-4">
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
			{#if $page.url.pathname.includes('/create')}
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
					<p>Recipe</p>
				</li>
			{/if}
			<li />
		</ul>
		<slot />
	</div>
</main>
