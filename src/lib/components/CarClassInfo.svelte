<script lang="ts">
	import CarInfo from '$lib/components/CarInfo.svelte';

	interface Props {
		carClass: any;
	}

	const { carClass }: Props = $props();
</script>

{#if carClass}
	<h4 class="text-lg font-semibold text-gray-700">{carClass.name}</h4>
	<div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each carClass.cars_in_class as car}
			<CarInfo {car} />
		{/each}
	</div>
{/if}
