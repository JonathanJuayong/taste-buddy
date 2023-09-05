<script lang="ts">
	import PotIcon from '~icons/mdi/pot-steam';
	import AccountIcon from '~icons/mdi/account-circle';
	import HeartIconFilled from '~icons/mdi/cards-heart';

	const links = [
		{
			href: '/app/myrecipes',
			label: 'My Recipes',
			Icon: PotIcon
		},
		{
			href: '/app/profile',
			label: 'My Profile',
			Icon: AccountIcon
		},
		{
			href: '/app/likes',
			label: 'My Likes',
			Icon: HeartIconFilled
		}
	];
</script>

<div class="grid sm:grid-cols-2 gap-8">
	{#each links as { href, label, Icon }}
		<a class="card aspect-video grid gap-4 place-content-center place-items-center" {href}>
			<Icon class="w-14 h-14" />
			<h2 class="h3">{label}</h2>
		</a>
	{/each}
</div>
