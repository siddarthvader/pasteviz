import { API_VARIABLES } from '../../constants';
import { api } from './request';
import type { geojsonLocal } from '../viz/choropleth/types';

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

export { batchGeoCode };
