<script lang="ts" async>
	import type { Map } from 'leaflet';
	import type { Layer, GeoJSON } from 'leaflet';
	import type { ScaleThreshold } from 'd3-scale';
	import type { Geometry, Feature } from 'geojson';
	import type { PathOptions } from 'leaflet';

	import { onMount } from 'svelte';
	import { getThreshold, initMap, trimKeys, trimValues } from './helpers/helpers';
	import { DefaultDatalayerOpacity, MapConstants } from '../constants';
	import { viz_keys, viz_values, color_pallette, viz_running, opacity_values } from '../stores';

	import { batchGeoCode } from './helpers/api';
	import { customPaletteSet } from './helpers/color_pallette';
	import { IVizRunning } from '../interface';

	export const render = renderFn;

	let map: Map;
	let geoJSONLayer: GeoJSON<any, Geometry>;
	let threshold: ScaleThreshold<number, string>;

	onMount(async () => {
		const L = await import('leaflet');
		map = L.map('map', { attributionControl: false }).setView(
			MapConstants.initialCenter,
			MapConstants.initialScale
		);
		L.control
			.attribution({
				prefix: 'made in love with <a href="https://leafletjs.com/">Leaflet</a>'
			})
			.addTo(map);

		await initMap(map);

		geoJSONLayer = L.geoJSON([], {
			onEachFeature,
			style: setGeoLayerStyle
		}).addTo(map);
	});

	function onEachFeature(feature: Feature, layer: Layer) {
		const name: string = feature.properties?.full_name;
		const dtValue: number = feature.properties?.value;

		layer.bindTooltip(`${name} - ${dtValue}`).openTooltip();
	}

	function setGeoLayerStyle(feature): PathOptions {
		const dtValue: number = feature.properties?.value;

		const fillVal: string = threshold(dtValue);

		return {
			fillColor: fillVal,
			fillOpacity: dtValue ? $opacity_values / 100 : 0,
			color: fillVal,
			weight: 1
		};
	}

	async function renderFn() {
		const keyList = trimKeys($viz_keys);
		const valList = trimValues($viz_values);

		const geojsonList = await batchGeoCode(keyList);
		const keyValueMap = keyList.reduce((f, key, index) => {
			f[key.toLowerCase()] = Number(valList[index]) || 0;
			return f;
		}, {} as Record<string, number>);

		const featureList = geojsonList.map((f) => {
			return {
				type: 'Feature',
				geometry: f.geojson,
				properties: {
					value:
						keyValueMap[f.iso_name.toLowerCase()] || keyValueMap[f.full_name.toLowerCase()] || 0,
					full_name: f.full_name,
					iso_name: f.iso_name
				}
			};
		});

		threshold = getThreshold(valList, customPaletteSet[$color_pallette]);

		geoJSONLayer.clearLayers();
		geoJSONLayer.addData(featureList);
		viz_running.set(IVizRunning.Idle);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
		integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
		crossorigin=""
	/>
</svelte:head>

<div id="map" class="w-full h-[600px] m-6" />

<style>
</style>
