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
		loading?: 'lazy' | 'eager';
	}

	const { serie, loading = 'lazy' }: Props = $props();

	const categoryTag = $derived({
		class: carCategories[serie.category as CarCategory]?.color ?? 'bg-gray-100',
		name: carCategories[serie.category as CarCategory]?.name ?? serie.category
	});
</script>

<div class="w-full">
	<div class="w-full overflow-hidden rounded-lg bg-white p-5 shadow-md" style="aspect-ratio: 16/9;">
		<img
			class="h-full w-full object-contain"
			src={serie.logo
				? 'https://images-static.iracing.com/img/logos/series/' + serie.logo
				: 'https://via.placeholder.com/300'}
			alt={serie.series_name}
			{loading}
		/>
	</div>

	<div class="p-4">
		<!-- Chips -->
		<div class="mb-3 flex flex-wrap gap-2">
			<span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
				#{serie.series_id}
			</span>

			<span
				class={`mr-2 rounded px-2.5 py-0.5 text-xs font-semibold bg-${categoryTag['class']}-100 text-${categoryTag['class']}-800`}
			>
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
		<a class="text-md font-bold text-white" href={'/series/' + serie.series_id}
			>{serie.series_name}</a
		>
	</div>
</div>
