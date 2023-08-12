<script lang="ts">
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';

	export let isLoading: boolean;
	export let variantLoading: string = 'variant-outline-primary';
	export let variantDefault: string = 'variant-filled-primary';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
</script>

{#if isLoading}
	<button class="btn variant-outline-primary w-full {variantLoading}" disabled>
		<slot />
		<ConicGradient stops={conicStops} class="ml-2" width="w-6" spin />
	</button>
{:else}
	<button class="btn w-full {variantDefault}" on:click>
		<slot />
		<slot name="button-icon" />
	</button>
{/if}
