import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { client } from '$lib/db/mongo';

// Connect to MongoDB before starting the server
client
	.connect()
	.then((): void => {
		console.log('MongoDB started');
	})
	.catch((e) => {
		console.log('MongoDB failed to start');
		console.log(e);
	});

const handleParaglide: Handle = i18n.handle();
export const handle: Handle = handleParaglide;
