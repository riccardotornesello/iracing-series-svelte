export type Driver = {
	name: string;
	litersPerLap: number;
	lapTime: number;
};

export type Stint = {
	driverName: string;
	duration: number; // TODO: remove
	laps: number; // TODO: remove
};
