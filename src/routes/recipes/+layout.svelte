<script lang="ts">
	import { page } from '$app/stores';
	import HomeIcon from '~icons/lucide/home';
</script>

<div class="m-4">
	<ul class="breadcrumb-nonresponsive mb-6">
		{#if $page.url.pathname === '/recipes'}
			<li>
				<p class="flex items-center">
					<HomeIcon class="mr-2" />
					Recipes
				</p>
			</li>
		{:else}
			<li class="crumb">
				<a href="/recipes" class="anchor flex items-center">
					<HomeIcon class="mr-2" />
					Recipes
				</a>
			</li>
		{/if}
		{#if $page.params?.id}
			<li class="crumb-separator">
				{'>'}
			</li>
			<li class="crumb">
				<p>{$page.params?.id}</p>
			</li>
		{/if}
		<li />
	</ul>
	<slot />
</div>
