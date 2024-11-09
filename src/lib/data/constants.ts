export enum CarCategory {
	SportsCar = 'sports_car',
	FormulaCar = 'formula_car',
	Oval = 'oval',
	DirtOval = 'dirt_oval',
	Road = 'road',
	DirtRoad = 'dirt_road'
}

export const carCategories: Record<CarCategory, { name: string; color: string }> = {
	[CarCategory.SportsCar]: {
		name: 'Sports',
		color: 'blue'
	},
	[CarCategory.FormulaCar]: {
		name: 'Formula',
		color: 'red'
	},
	[CarCategory.Oval]: {
		name: 'Oval',
		color: 'green'
	},
	[CarCategory.DirtOval]: {
		name: 'Dirt Oval',
		color: 'yellow'
	},
	[CarCategory.Road]: {
		name: 'Road',
		color: 'purple'
	},
	[CarCategory.DirtRoad]: {
		name: 'Dirt Road',
		color: 'pink'
	}
};
