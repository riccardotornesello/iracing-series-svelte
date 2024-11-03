import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSerie } from '$lib/db/queries';

export const load: PageServerLoad = async ({ params }) => {
	const serie = await getSerie(parseInt(params.serieId));

	if (!serie) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		serie: serie
	};
};
