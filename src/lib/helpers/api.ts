import { API_VARIABLES } from '$lib/constants';
import { api } from './request';
import type { geojsonLocal } from '$lib/visualisation/choropleth/types';

async function batchGeoCode(viz_keys: string[]) {
	const res = await api.post<string, geojsonLocal[]>(
		`${getAPIURL()}/batch-geocode`,
		JSON.stringify({ geo_locations: viz_keys })
	);
	return res;
}

function getAPIURL() {
	return process.env.NODE_ENV == 'dev' ? API_VARIABLES.DEV_URL : API_VARIABLES.URL;
}

async function generateDataFromOpenAI(query: string) {
	const res = await fetch('/api/openai', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query }),
		cf: {
			// Always cache this fetch regardless of content type
			// for a max of 60 seconds before revalidating the resource
			cacheTtl: 60,
			cacheEverything: true
		}
	});

	return res.json();
}

export { batchGeoCode, generateDataFromOpenAI };
