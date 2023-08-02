<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import XIcon from '~icons/lucide/x';
</script>

<Drawer
	regionDrawer="p-5 pt-10 relative"
	on:drawer={() => {
		setTimeout(drawerStore.close, 200);
	}}
>
	<ul class="space-y-5">
		<li><a class="text-2xl" href="/app">Home</a></li>
		<li><a class="text-2xl" href="/app/create">Create</a></li>
	</ul>
	<button class="btn absolute top-4 right-2" on:click={() => drawerStore.close()}><XIcon /></button>
</Drawer>
<slot />
