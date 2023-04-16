import type { Map, TileLayer } from 'leaflet';
import { MapBoundsMax, MapboxConfig, PaneOrder } from '../../constants';
import type { Feature } from 'geojson';

import { format } from 'd3-format';
import { scaleLinear, type ScaleThreshold, scaleThreshold } from 'd3-scale';

async function initMap(map: Map): Promise<Map> {
	const L = await import('leaflet');

	map.createPane(PaneOrder.baseMap).style.zIndex = '250'; // basemap pane
	map.createPane(PaneOrder.dataLayer).style.zIndex = '450'; // datalayer pane
	map.createPane(PaneOrder.labelLayer).style.zIndex = '620'; // label layer pane

	const baseMapLayer: TileLayer = L.tileLayer(
		`https://api.mapbox.com/styles/v1/${MapboxConfig.username}/${MapboxConfig.styleID}/tiles/{z}/{x}/{y}?access_token=${MapboxConfig.accessToken}`,
		{
			pane: PaneOrder.baseMap,
			noWrap: true,
			bounds: MapBoundsMax
		}
	);

	// Label consiting only labels
	const labelLayer: TileLayer = L.tileLayer(
		`https://api.mapbox.com/styles/v1/${MapboxConfig.username}/${MapboxConfig.labelLayerstyleID}/tiles/{z}/{x}/{y}?access_token=${MapboxConfig.accessToken}`,
		{
			pane: PaneOrder.labelLayer,
			noWrap: true,
			bounds: MapBoundsMax
		}
	);

	map.addLayer(baseMapLayer);
	map.addLayer(labelLayer);
	return map;
}

async function initLegend() {
	const L = await import('leaflet');

	return L.DomUtil.create('div', 'leading-5 text-darkText p-2 bg-lightText');
}

async function addGeoJsonLayer(map: Map, geoJSON: Feature[]) {
	const L = await import('leaflet');

	L.geoJSON(geoJSON).addTo(map);
}

function getDataDomainFromDatalayer(valuesList: number[], count: number): number[] {
	return scaleLinear()
		.domain([Math.min(...valuesList), Math.max(...valuesList)])
		.ticks(count);
}

function getThreshold(
	vizValuesList: number[],
	colorPalette: string[]
): ScaleThreshold<number, string> {
	const dataDomain: number[] = getDataDomainFromDatalayer(vizValuesList, colorPalette.length);
	const threshold: ScaleThreshold<number, string> = scaleThreshold();
	threshold.domain(dataDomain).range(colorPalette);
	return threshold;
}

function trimKeys(keyString: string): string[] {
	return keyString.split(',').map((v) => v.trim());
}
function trimValues(valString: string): number[] {
	return valString.split(',').map((v) => Number(v.trim()) || 0);
}

function formatNumber(d: number): string {
	return d < 999 ? format(',d')(d) : format('.3s')(d);
}
export { initMap, initLegend, addGeoJsonLayer, getThreshold, trimKeys, trimValues, formatNumber };
