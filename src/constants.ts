import type { LatLngBoundsExpression } from 'leaflet';
import type { vizType } from './interface';

const VizList: vizType[] = ['choropleth'];

const MapboxConfig: Record<string, string> = {
	accessToken:
		'pk.eyJ1Ijoic2lkbWFwcGluZyIsImEiOiJjbDQ2dzFncnkwNGtrM2NuemNrcXJ3cGhrIn0.ErNhngTH5pvqgUcSlGl0fw',
	tilesetID: 'mapbox.mapbox-streets-v8',
	username: 'sidmapping',
	styleID: 'cl8d0bmd6000914msd4qj8ez0',
	labelLayerstyleID: 'cl8k7y1aw006c14qnwuj4l6q4'
};

const MapBoundsMax: LatLngBoundsExpression = [
	[-90, -180],
	[90, 180]
];

const PaneOrder: Record<string, string> = {
	baseMap: 'pane250',
	dataLayer: 'pane450',
	labelLayer: 'pane650'
};

export { VizList, MapboxConfig, MapBoundsMax, PaneOrder };
