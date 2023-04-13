import { api } from './request';
import type { geojson } from './types';

async function batchGeoCode(viz_keys: string) {
	console.log('viz_keys is...', viz_keys);
	const res = await api.post<string, geojson[]>(
		'http://localhost:8080/batch-geocode/',
		JSON.stringify({ geo_locations: viz_keys.split(',').map((item) => item.trim()) })
	);
	return res;
}

export { batchGeoCode };
