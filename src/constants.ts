import type { LatLngBoundsExpression, ControlPosition } from 'leaflet';
import type { iMapContants, IVizComponent, IVizType } from './interface';

import {
	PUBLIC_MAPBOX_ACCESS_TOKEN,
	PUBLIC_MAPBOX_LABEL_LAYER_ID,
	PUBLIC_MAPBOX_STYLE_ID
} from '$env/static/public';
import Choropleth from './app/viz/Choropleth.svelte';
import BarChart from './app/viz/BarChart.svelte';
import EmptyViz from './app/viz/EmptyViz.svelte';

const VizList: IVizType[] = ['choropleth', 'barchart'];

const VizComponentMap: IVizComponent[] = [
	{
		component: EmptyViz,
		value: ''
	},
	{
		component: Choropleth,
		value: 'choropleth'
	},
	{
		component: BarChart,
		value: 'barchart'
	}
];

const MapboxConfig: Record<string, string> = {
	accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
	tilesetID: 'mapbox.mapbox-streets-v8',
	username: 'sidmapping',
	styleID: PUBLIC_MAPBOX_STYLE_ID,
	labelLayerstyleID: PUBLIC_MAPBOX_LABEL_LAYER_ID
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

const MapConstants: iMapContants = {
	initialScale: 2,
	initialCenter: [0, 0]
};

const DefaultColorPallette = 'customColorBrewer3';
const DefaultDatalayerOpacity = 69;

const ScalePositionConstants: Record<string, ControlPosition> = {
	TopLeft: 'topleft',
	TopRight: 'topright',
	BottomRight: 'bottomright',
	BottomLeft: 'bottomleft'
};

const API_VARIABLES = {
	URL: 'https://geocoding-api.vercel.app',
	DEV_URL: 'http://localhost:8080'
};

export {
	VizList,
	MapboxConfig,
	MapBoundsMax,
	PaneOrder,
	MapConstants,
	DefaultColorPallette,
	DefaultDatalayerOpacity,
	ScalePositionConstants,
	API_VARIABLES,
	VizComponentMap
};
