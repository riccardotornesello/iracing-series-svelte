<script lang="ts">
	import EnduranceDriversList from '$lib/components/EnduranceDriversList.svelte';
	import EnduranceStintsList from '$lib/components/EnduranceStintsList.svelte';

	let drivers = $state([
		{ name: 'Riccardo', litersPerLap: 2.72, lapTime: 22230 },
		{ name: 'Zio Voleri', litersPerLap: 3.45, lapTime: 45000 },
		{ name: 'Dennis', litersPerLap: 2.85, lapTime: 23000 }
	]);

	let stints = $state([
		{ driverName: 'Riccardo', duration: 2600000, laps: 20 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 15 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 18 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 20 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 15 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 18 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 20 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 15 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 18 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 20 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 15 },
		{ driverName: 'Riccardo', duration: 3600000, laps: 18 }
	]);
</script>

<EnduranceDriversList bind:drivers />

<EnduranceStintsList {stints} {drivers} />
