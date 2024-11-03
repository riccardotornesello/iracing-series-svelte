<script lang="ts">
	import data from '$lib/data/series_stats.json';
	import Serie from '$lib/components/Serie.svelte';
	import { CarCategory, carCategories } from '$lib/data/constants';

	// Filters
	let searchText = '';
	let selectedStatus: null | boolean = null;
	let selectedCategory: null | CarCategory = null;

	function filteredItems() {
		// First filter by name and status
		// Then return first the active series and then the inactive ones, all sorted by name
		return data
			.filter((serie) => {
				const matchesText = serie.series_name.toLowerCase().includes(searchText.toLowerCase());
				const matchesStatus = selectedStatus === null || serie.active === selectedStatus;
				const matchesClass = selectedCategory === null || serie.category === selectedCategory;
				return matchesText && matchesStatus && matchesClass;
			})
			.sort((a, b) => {
				if (a.active === b.active) {
					return a.series_name.localeCompare(b.series_name);
				}
				return a.active ? -1 : 1;
			});
	}
</script>

<div class="mx-auto max-w-6xl space-y-4 p-4">
	<!-- Filters -->
	<div class="flex flex-col items-center gap-4 md:flex-row">
		<input
			type="text"
			placeholder="Filtra per nome..."
			bind:value={searchText}
			class="w-full rounded border border-gray-300 p-2 md:w-1/2"
		/>

		<select bind:value={selectedStatus} class="w-full rounded border border-gray-300 p-2 md:w-1/2">
			<option value={null}>Filter by status</option>
			<option value={true}>Active</option>
			<option value={false}>Inactive</option>
		</select>

		<select
			bind:value={selectedCategory}
			class="w-full rounded border border-gray-300 p-2 md:w-1/2"
		>
			<option value={null}>Filter by category</option>
			{#each Object.keys(carCategories) as category}
				<option value={category}>{carCategories[category as CarCategory].name}</option>
			{/each}
		</select>
	</div>

	<!-- Grid -->
	<div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each filteredItems() as item}
			<Serie serie={item} />
		{/each}
	</div>
</div>
