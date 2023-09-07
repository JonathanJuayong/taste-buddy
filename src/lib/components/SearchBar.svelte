<script lang="ts">
	import SearchIcon from '~icons/lucide/search';

	export let value: string;
	export let action: string;
</script>

<form method="get" {action} class="mb-6 flex gap-2 items-end">
	<label class="flex-1">
		<span class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm">
			Search Recipes
		</span>
		<input
			name="search"
			bind:value
			placeholder="Type a recipe name here"
			class="input"
			type="text"
		/>
	</label>
	<button class="btn-icon variant-filled-primary" aria-label="search button">
		<SearchIcon />
	</button>
</form>
