<script lang="ts">
	export let name: string;
	export let label: string = name;
	export let error: string[] | undefined;
	export let value: any;
	export let type: 'text' | 'number' | 'textarea';
</script>

<label>
	<span class="ml-2 my-2 inline-block uppercase font-bold text-secondary-500 opacity-50 text-sm">
		{label}
	</span>
	{#if type === 'text'}
		<input
			class="input"
			{name}
			type="text"
			aria-invalid={error ? 'true' : undefined}
			bind:value
			{...$$restProps}
		/>
	{:else if type === 'number'}
		<input
			class="input"
			{name}
			type="number"
			aria-invalid={error ? 'true' : undefined}
			bind:value
			{...$$restProps}
		/>
	{:else if type === 'textarea'}
		<textarea
			class="textarea resize-none"
			rows="10"
			{name}
			aria-invalid={error ? 'true' : undefined}
			bind:value
			{...$$restProps}
		/>
	{/if}
	{#if error}<span class="text-error-700 inline-block ml-2">{error}</span>{/if}
</label>
