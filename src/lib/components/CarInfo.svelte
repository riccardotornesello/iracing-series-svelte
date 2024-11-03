<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	interface Props {
		car: any;
	}

	const { car }: Props = $props();
</script>

{#if car}
	<Card>
		<!-- Put the logo on top of the picture -->
		<div class="relative">
			<img
				class="h-48 w-full object-cover"
				src={'https://images-static.iracing.com' + car.folder + '/' + car.small_image}
				alt={car.car_name}
				loading="lazy"
			/>
			<img
				class="absolute left-5 bottom-5 max-w-20 max-h-10 object-contain"
				src={'https://images-static.iracing.com' + car.logo}
				alt={car.car_name}
				loading="lazy"
			/>
		</div>

		<div class="p-4">
			<!-- Chips -->
			<span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
				{'#' + car.car_id.toString()}
			</span>

			<!-- Title -->
			<h2 class="text-lg font-bold text-gray-900">{car.car_name}</h2>
		</div></Card
	>
{/if}
