<script lang="ts">
	import carAssets from '$lib/data/cars_assets.json';
	import cars from '$lib/data/cars.json';
	import Card from '$lib/components/Card.svelte';
</script>

<div class="mx-auto max-w-6xl space-y-4 p-4">
	<!-- Grid -->
	<div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each cars as car}
			<Card
				title={car.car_name}
				image={'https://images-static.iracing.com/' +
					carAssets[car.car_id]?.folder +
					'/' +
					carAssets[car.car_id]?.small_image}
				tags={[car.car_id]}
			/>
		{/each}
	</div>
</div>
