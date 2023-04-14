import { API_VARIABLES } from '../../constants';
import { api } from './request';
import type { geojsonLocal } from './types';

async function batchGeoCode(viz_keys: string[]) {
	const res = await api.post<string, geojsonLocal[]>(
		`${API_VARIABLES.URL}/batch-geocode`,
		JSON.stringify({ geo_locations: viz_keys })
	);
	return res;
}

export { batchGeoCode };
