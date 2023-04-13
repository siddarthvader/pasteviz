import type { Geometry } from 'geojson';
export type geojson = {
	iso_name: string;
	full_name: string;
	geojson: Geometry;
	created_at: Date;
	updated_at: Date;
};
