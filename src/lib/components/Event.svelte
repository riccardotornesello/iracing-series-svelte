<script lang="ts">
	import { carCategories, CarCategory } from '$lib/data/constants';

	interface Props {
		serie: {
			series_id: number;
			series_name: string;
			category: string;
			active: boolean;
			logo: string | null;
		};
	}

	const { serie }: Props = $props();

	const categoryTag = $derived({
		class: carCategories[serie.category as CarCategory]?.color ?? 'bg-gray-100',
		name: carCategories[serie.category as CarCategory]?.name ?? serie.category
	});
</script>

<div class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
	<img
		class="h-48 w-full object-contain"
		src={serie.logo
			? 'https://images-static.iracing.com/img/logos/series/' + serie.logo
			: 'https://via.placeholder.com/300'}
		alt={serie.series_name}
	/>

	<div class="p-4">
		<!-- Chips -->
		<div class="mb-3 flex flex-wrap gap-2">
			<span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
				#{serie.series_id}
			</span>

			<span class={'mr-2 rounded px-2.5 py-0.5 text-xs font-semibold ' + categoryTag['class']}>
				{categoryTag['name']}
			</span>

			{#if serie.active}
				<span class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
					Active
				</span>
			{:else}
				<span class="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
					Inactive
				</span>
			{/if}
		</div>

		<!-- Title -->
		<h2 class="text-lg font-bold text-gray-900">{serie.series_name}</h2>
	</div>
</div>
