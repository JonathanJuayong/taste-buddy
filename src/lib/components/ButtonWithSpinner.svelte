<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let isLoading: boolean;
	export let btnClasses: string = '';
	export let variantLoading: string = 'variant-outline-primary';
	export let variantDefault: string = 'variant-filled-primary';
</script>

{#if isLoading}
	<button class={`btn variant-outline-primary w-full ${variantLoading} ${btnClasses}`} disabled>
		<slot />
		<ProgressRadial
			stroke={120}
			class="ml-4"
			width="w-6"
			meter="stroke-primary-500"
			track="stroke-primary-500/30"
		/>
	</button>
{:else}
	<button class={`btn w-full ${variantDefault} ${btnClasses}`} on:click>
		<slot />
		<slot name="button-icon" />
	</button>
{/if}
