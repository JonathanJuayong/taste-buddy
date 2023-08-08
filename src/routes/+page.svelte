<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const href = data.user.uid ? '/app' : '/signin';
	const linkText = data.user.uid ? 'Go to App' : 'Sign In';
</script>

<main class="p-6">
	<a class="btn variant-filled-primary w-full" {href}>{linkText}</a>
</main>
