import { api } from './request';
import type { geojsonLocal } from './types';

async function batchGeoCode(viz_keys: string[]) {
	const res = await api.post<string, geojsonLocal[]>(
		'http://localhost:8080/batch-geocode/',
		JSON.stringify({ geo_locations: viz_keys })
	);
	return res;
}

export { batchGeoCode };
