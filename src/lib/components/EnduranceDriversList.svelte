<script lang="ts">
	import moment from 'moment';
	import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
	import Modal from '$lib/components/Modal.svelte';

	let tankCapacity = 100;

	let drivers = $state([
		{ name: 'Riccardo', litersPerLap: 2.72, lapTime: 222130, color: 'red' },
		{ name: 'Zio Voleri', litersPerLap: 3.45, lapTime: 450000, color: 'blue' },
		{ name: 'Dennis', litersPerLap: 2.85, lapTime: 230000, color: 'green' }
	]);

	let formInputs = $state({
		name: '',
		litersPerLap: null,
		lapTime: null,
		color: 'gray'
	});

	let showCreationModal = $state(false);

	function getMaxLaps(driver: any) {
		return Math.floor(tankCapacity / driver.litersPerLap);
	}

	function submitDriverForm(e: SubmitEvent) {
		e.preventDefault();
		showCreationModal = false;
		drivers = [...drivers, formInputs];
		formInputs = { name: '', litersPerLap: null, lapTime: null, color: 'gray' };
	}
</script>

{#snippet driverCard(driver: any)}
	<div class="my-2 flex">
		<div class="w-2 rounded-l-lg bg-{driver.color}-500"></div>
		<div
			class="flex flex-1 flex-row items-center justify-between rounded-r-lg border border-gray-200 bg-white p-2 shadow-md"
		>
			<div>
				<h2 class="text-lg font-semibold text-gray-900">{driver.name}</h2>
				<div class="text-sm text-gray-500">
					<p>
						Liters per lap: <span class="font-medium text-gray-800">{driver.litersPerLap}</span>
					</p>
					<p>
						Average lap time: <span class="font-medium text-gray-800"
							>{moment.utc(driver.lapTime).format('mm:ss.S')}</span
						>
					</p>
				</div>
			</div>
			<div class="text-sm text-gray-500">
				<p>
					Max laps: <span class="font-medium text-gray-800">{getMaxLaps(driver)}</span>
				</p>
				<p>
					Stint time: <span class="font-medium text-gray-800"
						>{moment.utc(driver.lapTime * getMaxLaps(driver)).format('HH:mm:ss')}</span
					>
				</p>
			</div>
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-md">
	{#each drivers as driver}
		{@render driverCard(driver)}
	{/each}

	<button
		class="w-full rounded-lg bg-white p-2 text-3xl font-semibold text-gray-900 shadow-md"
		onclick={() => (showCreationModal = true)}
	>
		+
	</button>
</div>

<Modal bind:showModal={showCreationModal} title="Add a new driver">
	<form class="space-y-6" onsubmit={submitDriverForm}>
		<div class="mb-6 grid gap-6 md:grid-cols-2">
			<div class="col-span-2">
				<Label for="driver_name" class="mb-2 text-white">Name</Label>
				<Input
					type="text"
					id="driver_name"
					placeholder="John"
					required
					bind:value={formInputs.name}
				/>
			</div>
			<div>
				<Label for="liters_per_lap" class="mb-2 text-white">Liters per lap</Label>
				<Input
					type="number"
					id="liters_per_lap"
					placeholder="2,22"
					required
					bind:value={formInputs.litersPerLap}
				/>
			</div>
			<div>
				<Label for="lap_time" class="mb-2 text-white">Average lap time</Label>
				<Input
					type="number"
					id="lap_time"
					placeholder="1:50.2"
					required
					bind:value={formInputs.lapTime}
				/>
			</div>
		</div>

		<Button type="submit" class="bg-green-500 text-white">Add driver</Button>
	</form>
</Modal>
