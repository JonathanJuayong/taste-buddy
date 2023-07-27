<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import MenuIcon from '~icons/lucide/menu';
	import BabyIcon from '~icons/lucide/baby';
	import { page } from '$app/stores';

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
</script>

<main class="flex flex-col h-full">
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead"
			><button class="btn btn-icon p-1"><MenuIcon /></button></svelte:fragment
		>
		<h1 class="h1">{getPageName($page.url.pathname)}</h1>
		<svelte:fragment slot="trail"
			><button class="btn btn-icon p-1"><BabyIcon /></button></svelte:fragment
		>
	</AppBar>
	<div class="flex-grow py-6 px-4">
		<slot />
	</div>
</main>
