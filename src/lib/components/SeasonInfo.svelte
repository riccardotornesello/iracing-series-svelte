<script lang="ts">
	import CarClassInfo from '$lib/components/CarClassInfo.svelte';

	interface Props {
		season: any;
	}

	const { season }: Props = $props();
</script>

<h2 class="text-xl font-semibold text-gray-700">Car classes</h2>

{#each season.car_classes as carClass}
	<CarClassInfo {carClass} />
{/each}
