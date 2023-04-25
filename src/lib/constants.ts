import type { LatLngBoundsExpression, ControlPosition } from 'leaflet';
import type { iMapContants, IVizType } from '$lib/interface';

import {
	PUBLIC_MAPBOX_ACCESS_TOKEN,
	PUBLIC_MAPBOX_LABEL_LAYER_ID,
	PUBLIC_MAPBOX_STYLE_ID,
	PUBLIC_OPENAI_API_KEY
} from '$env/static/public';

const VizList: IVizType[] = ['choropleth', 'barchart', 'piechart'];

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

type Route = {
	name: string;
	path: string;
};
const Route_List: Route[] = [
	{
		name: 'Basic',
		path: '/'
	},
	{
		name: 'OpenAI (Beta)',
		path: '/openai'
	}
];

const OpenAIConfig = {
	API_KEY: PUBLIC_OPENAI_API_KEY
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
	Route_List,
	OpenAIConfig
};
