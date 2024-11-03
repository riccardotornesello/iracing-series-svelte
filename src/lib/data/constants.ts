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
		color: 'bg-blue-100'
	},
	[CarCategory.FormulaCar]: {
		name: 'Formula',
		color: 'bg-red-100'
	},
	[CarCategory.Oval]: {
		name: 'Oval',
		color: 'bg-green-100'
	},
	[CarCategory.DirtOval]: {
		name: 'Dirt Oval',
		color: 'bg-yellow-100'
	},
	[CarCategory.Road]: {
		name: 'Road',
		color: 'bg-purple-100'
	},
	[CarCategory.DirtRoad]: {
		name: 'Dirt Road',
		color: 'bg-pink-100'
	}
};
