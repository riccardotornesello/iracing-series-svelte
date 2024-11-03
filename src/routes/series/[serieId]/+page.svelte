<script lang="ts">
	import SeasonInfo from '$lib/components/SeasonInfo.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-6xl space-y-4 p-4">
	<h1 class="text-3xl font-bold text-gray-900">{data.serie.series_name}</h1>
	<h2 class="text-2xl font-semibold text-gray-700">#{data.serie.series_id}</h2>

	<SeasonInfo season={data.serie.seasons[0]} />
</div>
