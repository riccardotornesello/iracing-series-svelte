<script lang="ts">
	import moment from 'moment';
	import { Input, Label, Button } from 'flowbite-svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { colors } from '$lib/constants';
	import type { Driver } from '$lib/types';

	interface Props {
		drivers: Driver[];
	}

	let { drivers = $bindable() }: Props = $props();

	const initialNewDriver = {
		name: '',
		litersPerLap: undefined,
		lapTime: undefined // TODO: change input
	};

	let showNewDriverModal = $state(false);
	let newDriver: Partial<Driver> = $state(initialNewDriver);

	let tankCapacity = 100; // TODO

	function getMaxLaps(driver: any) {
		return Math.floor(tankCapacity / driver.litersPerLap);
	}

	function submitDriverForm(e: SubmitEvent) {
		e.preventDefault();
		showNewDriverModal = false;
		drivers = [...drivers, newDriver as Driver];
		newDriver = initialNewDriver;
	}
</script>

{#snippet driverCard(driver: any, index: number)}
	<div class="relative my-2">
		<div class="flex">
			<div class="w-2 rounded-l-lg bg-{colors[index]}"></div>

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
								>{moment.utc(driver.lapTime).format('m:ss.S')}</span
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
							>{moment.utc(driver.lapTime * getMaxLaps(driver)).format('H:mm:ss')}</span
						>
					</p>
					<p>
						Used fuel: <span class="font-medium text-gray-800"
							>{(getMaxLaps(driver) * driver.litersPerLap).toFixed(2)}</span
						>
					</p>
				</div>
			</div>
		</div>

		<div class="absolute -right-10 top-0 text-red-500">
			<button
				class="rounded-lg bg-white p-2 shadow-md"
				onclick={() => (drivers = drivers.filter((_, i) => i !== index))}
				aria-label="Remove driver"
			>
				<svg
					class="h-4 w-4"
					fill="#ff0000"
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 482.428 482.429"
					xml:space="preserve"
				>
					<g>
						<g>
							<path
								d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
					   c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
					   h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
					   C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
					   C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
					   c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
					   c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
					   V115.744z"
							/>
							<path
								d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
					   c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
							/>
							<path
								d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
					   c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
							/>
							<path
								d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
					   c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
							/>
						</g>
					</g>
				</svg>
			</button>
		</div>
	</div>
{/snippet}

<div class="max-w-md">
	{#each drivers as driver, index}
		{@render driverCard(driver, index)}
	{/each}

	<button
		class="w-full rounded-lg bg-white p-2 text-3xl font-semibold text-gray-900 shadow-md"
		onclick={() => (showNewDriverModal = true)}
	>
		+
	</button>
</div>

<Modal bind:showModal={showNewDriverModal} title="Add a new driver">
	<form class="space-y-6" onsubmit={submitDriverForm}>
		<div class="mb-6 grid gap-6 md:grid-cols-2">
			<div class="col-span-2">
				<Label for="driver_name" class="mb-2 text-white">Name</Label>
				<Input
					type="text"
					id="driver_name"
					placeholder="John"
					required
					bind:value={newDriver.name}
				/>
			</div>
			<div>
				<Label for="liters_per_lap" class="mb-2 text-white">Liters per lap</Label>
				<Input
					type="number"
					id="liters_per_lap"
					placeholder="2,22"
					required
					bind:value={newDriver.litersPerLap}
				/>
			</div>
			<div>
				<Label for="lap_time" class="mb-2 text-white">Average lap time</Label>
				<Input
					type="number"
					id="lap_time"
					placeholder="1:50.2"
					required
					bind:value={newDriver.lapTime}
				/>
			</div>
		</div>

		<Button type="submit" class="bg-green-500 text-white">Add driver</Button>
	</form>
</Modal>
