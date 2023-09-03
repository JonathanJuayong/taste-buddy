<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import PersonIcon from '~icons/charm/person';
	import StoveIcon from '~icons/mdi/stove-burner';
	import KnifeIcon from '~icons/icon-park-outline/kitchen-knife';

	export let href: string,
		name: string,
		image_src: string,
		description: string,
		serves: number,
		cook_time: number,
		prep_time: number;

	function truncateText(text: string, maxLength: number) {
		if (text.length > maxLength) {
			const truncated = text.slice(0, maxLength - 3);
			return `${truncated}...`;
		}

		return text;
	}
</script>

<a {href} target="_blank" class="card sm:grid sm:grid-cols-2">
	<header>
		<CldImage
			class="rounded-t-3xl sm:rounded-none sm:h-full sm:rounded-l-3xl"
			height=""
			width="1000"
			alt={name}
			aspectRatio={1.9}
			src={image_src}
		/>
	</header>
	<article class="grid">
		<section class="p-10 h-60">
			<h3 class="h3 font-extrabold mb-4">{name}</h3>
			<p>{truncateText(description, 80)}</p>
		</section>
		<footer class="border-t-2 border-t-surface-700 h-20">
			<ul class="flex justify-evenly h-full">
				<li class="flex items-center h-full">
					<PersonIcon class="mr-2" />
					{serves}
				</li>
				<li aria-label="separator" class="border-r-2 border-r-surface-700" />
				<li class="flex items-center h-full">
					<StoveIcon class="mr-2" />
					{cook_time}
				</li>
				<li aria-label="separator" class="border-r-2 border-r-surface-700" />
				<li class="flex items-center"><KnifeIcon class="mr-2" />{prep_time}</li>
			</ul>
		</footer>
	</article>
</a>
