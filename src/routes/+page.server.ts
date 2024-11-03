import type { PageServerLoad } from './$types';
import { client } from '$lib/db/mongo';

export const load: PageServerLoad = async () => {
	return {
		series: await client
			.db('test')
			.collection('series')
			.find({}, { projection: { _id: 0, series_id: 1, series_name: 1, active: 1, category: 1, logo: 1 } })
			.toArray()
	};
};
