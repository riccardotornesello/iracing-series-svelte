<script lang="ts">
	import CarClassInfo from '$lib/components/CarClassInfo.svelte';

	interface Props {
		season: any;
	}

	const { season }: Props = $props();
</script>

<h3 class="text-xl font-semibold text-gray-700">
	Season {season.season_year}-{season.season_quarter}
</h3>

{#each season.car_classes as carClass}
	<CarClassInfo {carClass} />
{/each}
