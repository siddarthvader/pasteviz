import type { Map, TileLayer } from 'leaflet';
import { MapBoundsMax, MapboxConfig, PaneOrder } from '../../constants';
import type { Feature } from 'geojson';

async function initMap(map: Map): Promise<Map> {
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

export function addGeoJsonLayer(L, map: Map, geoJSON: Feature[]) {
	L.geoJSON(geoJSON).addTo(map);
}

export { initMap };
