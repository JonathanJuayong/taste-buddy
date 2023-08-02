<script lang="ts">
	import { AppBar, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import MenuIcon from '~icons/lucide/menu';
	import BabyIcon from '~icons/lucide/baby';
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
		<slot />
	</div>
</main>
