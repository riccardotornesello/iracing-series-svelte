<script lang="ts">
	import Serie from '$lib/components/Serie.svelte';
	import { CarCategory, carCategories } from '$lib/data/constants';
	import type { PageData } from './$types';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import type { ComponentProps } from 'svelte';

	let { data }: { data: PageData } = $props();

	// Filters
	let searchText = $state('');
	let filters: Record<string, ComponentProps<typeof Dropdown>> = $state({
		status: {
			value: null,
			placeholder: 'All statuses',
			options: [
				{ value: null, label: 'All statuses' },
				{ value: true, label: 'Active' },
				{ value: false, label: 'Inactive' }
			]
		},
		category: {
			value: null,
			placeholder: 'All categories',
			options: [
				{ value: null, label: 'All categories' },
				...Object.keys(carCategories).map((category) => ({
					value: category as CarCategory,
					label: carCategories[category as CarCategory].name
				}))
			]
		}
	});

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

				if (filters.status.value !== null && serie.active !== filters.status.value) {
					return false;
				}

				if (filters.category.value !== null && serie.category !== filters.category.value) {
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
	<div class="px-4 py-3">
		<label class="flex h-12 w-full min-w-40 flex-col">
			<div class="flex h-full w-full flex-1 items-stretch rounded-xl">
				<div
					class="flex items-center justify-center rounded-l-xl border-r-0 border-none bg-[#243647] pl-4 text-[#93adc8]"
					data-icon="MagnifyingGlass"
					data-size="24px"
					data-weight="regular"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24px"
						height="24px"
						fill="currentColor"
						viewBox="0 0 256 256"
					>
						<path
							d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
						></path>
					</svg>
				</div>
				<input
					placeholder="Search by name"
					class="form-input flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl rounded-l-none border-l-0 border-none bg-[#243647] px-4 pl-2 text-base font-normal leading-normal text-white placeholder:text-[#93adc8] focus:border-none focus:outline-0 focus:ring-0"
					bind:value={searchText}
				/>
			</div>
		</label>
	</div>

	<div class="flex flex-wrap gap-3 p-3 pr-4">
		{#each Object.keys(filters) as filter}
			<Dropdown
				bind:value={filters[filter].value}
				placeholder={filters[filter].placeholder}
				options={filters[filter].options}
			/>
		{/each}
	</div>

	<!-- Grid -->
	<div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each filteredItems as item, index}
			<Serie serie={item} loading={index < 4 ? 'eager' : 'lazy'} />
		{/each}
	</div>
</div>
