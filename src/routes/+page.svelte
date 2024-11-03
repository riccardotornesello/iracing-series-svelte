<script lang="ts">
	import Serie from '$lib/components/Serie.svelte';
	import { CarCategory, carCategories } from '$lib/data/constants';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Filters
	let searchText = $state('');
	let selectedStatus: null | boolean = $state(null);
	let selectedCategory: null | CarCategory = $state(null);

	// First filter by name and status
	// Then return first the active series and then the inactive ones, all sorted by name
	let filteredItems = $derived(
		data.series
			.filter((serie) => {
				if (
					searchText !== '' &&
					!serie.series_name.toLowerCase().includes(searchText.toLowerCase())
				) {
					return false;
				}

				if (selectedStatus !== null && serie.active !== selectedStatus) {
					return false;
				}

				if (selectedCategory !== null && serie.category !== selectedCategory) {
					return false;
				}

				return true;
			})
			.sort((a, b) => {
				if (a.active === b.active) {
					return a.series_name.localeCompare(b.series_name);
				}
				return a.active ? -1 : 1;
			})
	);
</script>

<div class="mx-auto max-w-6xl space-y-4 p-4">
	<!-- Filters -->
	<div class="flex flex-col items-center gap-4 md:flex-row">
		<input
			type="text"
			placeholder="Filter by name..."
			bind:value={searchText}
			class="w-full rounded border border-gray-300 p-2 md:w-1/2"
		/>

		<select bind:value={selectedStatus} class="w-full rounded border border-gray-300 p-2 md:w-1/2">
			<option value={null}>All statuses</option>
			<option value={true}>Active</option>
			<option value={false}>Inactive</option>
		</select>

		<select
			bind:value={selectedCategory}
			class="w-full rounded border border-gray-300 p-2 md:w-1/2"
		>
			<option value={null}>All categories</option>
			{#each Object.keys(carCategories) as category}
				<option value={category}>{carCategories[category as CarCategory].name}</option>
			{/each}
		</select>
	</div>

	<!-- Grid -->
	<div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each filteredItems as item}
			<Serie serie={item} />
		{/each}
	</div>
</div>
