<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppBar,
		Drawer,
		Toast,
		drawerStore,
		type DrawerSettings,
		Modal
	} from '@skeletonlabs/skeleton';
	import XIcon from '~icons/lucide/x';
	import MenuIcon from '~icons/lucide/menu';
	import type { LayoutData } from './$types';
	import FacebookIcon from '~icons/mdi/facebook';
	import TwitterIcon from '~icons/mdi/twitter';
	import InstagramIcon from '~icons/mdi/instagram';
	import { page } from '$app/stores';
	import { CldImage } from 'svelte-cloudinary';

	export let data: LayoutData;

	$: ({
		profile: { id, profile_picture, name }
	} = data);

	const drawerSettings: DrawerSettings = {
		id: 'main',
		position: 'left'
	};

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}

	$: navLinks = [
		{ label: 'App', href: '/app' },
		{ label: 'Recipes', href: '/recipes' },
		{ label: id ? 'Sign out' : 'Sign in', href: '/signin' }
	];
</script>

<Modal />

<Toast />

<Drawer
	regionDrawer="p-5 pt-10 relative"
	on:drawer={() => {
		setTimeout(drawerStore.close, 200);
	}}
>
	<ul class="space-y-5">
		{#if id}
			<li>
				<a class="grid justify-center gap-2 text-center" href="/profile/{id}">
					<CldImage
						class="rounded-full mx-auto"
						alt={name ?? ''}
						height=""
						width="100"
						aspectRatio={1}
						src={profile_picture ?? ''}
					/>
					{name ?? ''}
				</a>
			</li>
		{/if}
		{#each navLinks as { label, href }}
			<li>
				<a
					{href}
					class="text-2xl"
					class:underline={$page.url.pathname.includes(href)}
					class:underline-offset-4={$page.url.pathname.includes(href)}
				>
					{label}
				</a>
			</li>
		{/each}
		{#if id}
			<li>
				<a class="text-2xl" href="/app/create">Create</a>
			</li>
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
	<a href="/" class="font-extrabold">Taste Buddy</a>
</AppBar>

<div class="px-6 max-w-4xl mx-auto min-h-screen">
	<nav class="sm:flex items-center justify-between py-6 mb-6 hidden">
		<a href="/" class="font-extrabold">Taste Buddy</a>
		<ul class="flex gap-6 items-center transition-all">
			{#each navLinks as { label, href }}
				<a
					class:underline={$page.url.pathname.includes(href)}
					class:underline-offset-4={$page.url.pathname.includes(href)}
					{href}
				>
					{label}
				</a>
			{/each}
			{#if id}
				<li class="variant-outline-primary btn btn-sm">
					<a class="text-primary-700" href="/app/create"> Create </a>
				</li>
				<li>
					<a class="grid justify-center gap-2" href="/profile/{id}">
						<CldImage
							class="rounded-full"
							alt={name}
							height=""
							width="50"
							aspectRatio={1}
							src={profile_picture ?? ''}
						/>
					</a>
				</li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
<footer class="mt-5 py-20 bg-surface-800">
	<div class="max-w-4xl mx-auto flex flex-col items-center gap-10">
		<a href="/" class="font-extrabold">Taste Buddy</a>
		<ul class="flex gap-4 justify-center">
			<li><button class="btn-icon variant-outline-surface"><FacebookIcon /></button></li>
			<li><button class="btn-icon variant-outline-surface"><TwitterIcon /></button></li>
			<li><button class="btn-icon variant-outline-surface"><InstagramIcon /></button></li>
		</ul>
		<p class="text-sm text-surface-400">Copyright {new Date().getFullYear()}</p>
	</div>
</footer>
