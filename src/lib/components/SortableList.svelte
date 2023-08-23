<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { flip } from 'svelte/animate';

	type WithId<T> = {
		id: string | number;
	} & T;
	type U = $$Generic<WithId>;

	export let itemListWithId: WithId<U>[];
	export let thresholdY = 80;
	export let onDragEnd: (data: { indexOffset: number; i: number; offsetY: number }) => void;

	const defaultPosition = { x: 0, y: 0 };
	let position = defaultPosition;
	let activeIndex: number | null = null;
</script>

{#each itemListWithId as item, i (item.id)}
	<div
		animate:flip={{ duration: 100 }}
		use:draggable={{
			bounds: {
				left: 20,
				right: 20
			},
			handle: '.handle',
			position,
			onDragStart() {
				activeIndex = i;
			},
			onDragEnd({ offsetY }) {
				activeIndex = null;
				position = defaultPosition;
				const absoluteY = Math.abs(offsetY);
				if (absoluteY < thresholdY) return;
				const indexOffset = Math.floor(absoluteY / thresholdY);

				onDragEnd({ indexOffset, i, offsetY });
			}
		}}
	>
		<slot {i} {item} />
	</div>
{/each}
