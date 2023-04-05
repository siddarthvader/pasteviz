import type { LatLngTuple } from 'leaflet';

type vizType = 'choropleth';

interface iMapContants {
	initialScale: number;
	initialCenter: LatLngTuple;
}

export type { vizType, iMapContants };
