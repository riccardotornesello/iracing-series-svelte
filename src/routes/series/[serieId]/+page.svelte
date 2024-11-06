<script lang="ts">
	import SeasonInfo from '$lib/components/SeasonInfo.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	let selectedSeason = $state(data.serie.seasons[0].season_id);
</script>

<svelte:head>
	<title>{data.serie.series_name}</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-4 p-4">
	<h1 class="text-3xl font-bold text-gray-900">{data.serie.series_name} #{data.serie.series_id}</h1>

	<select bind:value={selectedSeason} class="w-full rounded border border-gray-300 p-2 md:w-1/2">
		{#each data.serie.seasons as season}
			<option value={season.season_id}>{season.season_year} - S{season.season_quarter}</option>
		{/each}
	</select>


	<SeasonInfo season={data.serie.seasons.find((season) => season.season_id === selectedSeason)} />
</div>
