<script lang="ts">
	// import type { LayoutData } from './$types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import MenuIcon from '~icons/lucide/menu';
	import BabyIcon from '~icons/lucide/baby';

	// export let data: LayoutData;
</script>

<main class="flex flex-col h-full">
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead"
			><button class="btn btn-icon p-1"><MenuIcon /></button></svelte:fragment
		>
		<h1 class="h1">Home</h1>
		<svelte:fragment slot="trail"
			><button class="btn btn-icon p-1"><BabyIcon /></button></svelte:fragment
		>
	</AppBar>
	<div class="flex-grow py-6 px-4">
		<slot />
	</div>
</main>
