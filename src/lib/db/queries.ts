import { client } from '$lib/db/mongo';

export async function getCars() {
	const cars = await client
		.db('test')
		.collection('cars')
		.find(
			{},
			{
				projection: {
					_id: 0,
					car_id: 1,
					car_name: 1
				}
			}
		)
		.toArray();

	return cars.reduce(
		(acc, car) => {
			acc[car.car_id] = car;
			return acc;
		},
		{} as Record<string, any>
	);
}

export async function getCarClasses(carClassIds: number[]) {
	const carClasses = await client
		.db('test')
		.collection('car_classes')
		.aggregate([
			{
				$match: {
					car_class_id: { $in: carClassIds }
				}
			},
			{
				$lookup: {
					from: 'cars',
					localField: 'cars_in_class.car_id',
					foreignField: 'car_id',
					as: 'cars_in_class'
				}
			},
			{
				$project: {
					_id: 0,
					car_class_id: 1,
					name: 1,
					cars_in_class: {
						$map: {
							input: {
								$sortArray: {
									input: '$cars_in_class',
									sortBy: { car_name: 1 }
								}
							},
							as: 'car',
							in: {
								car_id: '$$car.car_id',
								car_name: '$$car.car_name',
								folder: '$$car.folder',
								logo: '$$car.logo',
								small_image: '$$car.small_image'
							}
						}
					}
				}
			}
		])
		.toArray();

	return carClasses.reduce(
		(acc, carClass) => {
			acc[carClass.car_class_id] = {
				...carClass
			};
			return acc;
		},
		{} as Record<string, any>
	);
}

export async function getSerie(serieId: number) {
	const serie = await client
		.db('test')
		.collection('series')
		.findOne(
			{ series_id: serieId },
			{
				projection: {
					_id: 0,
					series_id: 1,
					series_name: 1,
					active: 1,
					category: 1,
					logo: 1,
					seasons: 1
				}
			}
		);

	if (!serie) {
		return null;
	}

	const carClassIds = serie.seasons.reduce((acc, season) => {
		season.car_classes.forEach((carClass) => {
			acc.add(carClass.car_class_id);
		});
		return acc;
	}, new Set());
	const carClasses = await getCarClasses(Array.from(carClassIds));

	return {
		...serie,
		seasons: serie.seasons.map((season) => ({
			...season,
			car_classes: season.car_classes.map((carClass) => carClasses[carClass.car_class_id])
		}))
	};
}
