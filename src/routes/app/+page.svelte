<script lang="ts">
	import PotIcon from '~icons/mdi/pot-steam';
	import AccountIcon from '~icons/mdi/account-circle';
</script>

<div class="grid sm:grid-cols-2 gap-8">
	<a
		class="card aspect-video grid gap-4 place-content-center place-items-center"
		href="/app/myrecipes"
	>
		<PotIcon class="w-14 h-14" />
		<h2 class="h3">My Recipes</h2>
	</a>
	<a
		class="card aspect-video grid gap-4 place-content-center place-items-center"
		href="/app/profile"
	>
		<AccountIcon class="w-14 h-14" />
		<h2 class="h3">My Profile</h2>
	</a>
</div>
