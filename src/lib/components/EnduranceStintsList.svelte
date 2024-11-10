<script lang="ts">
	import type { Driver, Stint } from '$lib/types';
	import moment from 'moment';
	import { colors } from '$lib/constants';

	interface Props {
		stints: Stint[];
		drivers: Driver[];
	}

	let { stints = $bindable(), drivers = $bindable() }: Props = $props();

	function getStintStartTime(i: number) {
		return stints.slice(0, i).reduce((acc, s) => acc + s.duration, 0);
	}

	function calculateStintPosition(i: number) {
		const start = getStintStartTime(i);
		const duration = stints[i].duration;

		const msInDay = 86400000; // TODO add scale

		return {
			top: (start / msInDay) * 100 + '%',
			height: (duration / msInDay) * 100 + '%'
		};
	}

	function getStintDriver(stintIndex: number) {
		const driverIndex = drivers.findIndex((d) => d.name === stints[stintIndex].driverName);
		return { driver: drivers[driverIndex], index: driverIndex };
	}

	let raceStart = '2021-09-01T12:00:00Z'; // TODO
</script>

<div class="relative my-6 h-screen max-w-md">
	{#each stints as stint, i}
		<div
			class="event"
			style="top: {calculateStintPosition(i).top}; height: {calculateStintPosition(i).height};"
		>
			<div class="time">
				{moment(raceStart).add(getStintStartTime(i)).format('HH:mm')}
			</div>
			{#if i === stints.length - 1}
				<div class="endTime">
					{moment(raceStart)
						.add(getStintStartTime(i) + stint.duration)
						.format('HH:mm')}
				</div>
			{/if}

			<div class="flex h-full py-0.5">
				<div class="w-2 rounded-l-lg bg-{colors[getStintDriver(i).index]}"></div>
				<div
					class="flex flex-1 flex-row items-center justify-between rounded-r-lg border border-gray-200 bg-white p-2 shadow-md"
				>
					<h2 class="text-lg font-semibold text-gray-900">{stint.driverName}</h2>
					<div class="text-sm text-gray-500">
						<p>Numero di giri: <span class="font-medium text-gray-800">{stint.laps}</span></p>
						<p>
							Durata totale:
							<span class="font-medium text-gray-800">
								{moment.utc(stint.duration).format('HH:mm:ss')}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.event {
		position: absolute;
		left: 4rem;
		right: 1rem;
	}

	.time {
		position: absolute;
		left: -30px;
		top: 0px;
		transform: translate(-50%, -50%);
	}

	.endTime {
		position: absolute;
		left: -30px;
		bottom: -22px;
		transform: translate(-50%, -50%);
	}
</style>
