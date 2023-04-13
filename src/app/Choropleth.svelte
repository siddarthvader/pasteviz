<script lang="ts" async>
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';
	import { getThreshold, initMap, trimKeys, trimValues } from './helpers/helpers';
	import { DefaultDatalayerOpacity, MapConstants } from '../constants';
	import { features_list, viz_keys, viz_values, color_pallette } from '../stores';
	import type { Layer } from 'leaflet';
	import type { ScaleThreshold } from 'd3-scale';

	import type { Feature } from 'geojson';

	import { batchGeoCode } from './helpers/api';
	import { customPaletteSet } from './helpers/color_pallette';

	let threshold: ScaleThreshold<number, string>;

	export const render = async () => {
		const keyList = trimKeys($viz_keys);
		const valList = trimValues($viz_values);

		console.log('keyList is...', keyList);

		const geojsonList = await batchGeoCode(keyList);
		const keyValueMap = keyList.reduce((f, key, index) => {
			f[key] = Number(valList[index]) || 0;
			return f;
		}, {} as Record<string, number>);

		const featureList = geojsonList.map((f) => {
			return {
				type: 'Feature',
				geometry: f.geojson,

				properties: {
					value: keyValueMap[f.iso_name] || 0,
					name: f.full_name,
					iso_name: f.iso_name
				}
			};
		});

		threshold = getThreshold(valList, customPaletteSet[$color_pallette]);

		console.log(' featureList is...', featureList);
	};

	let map: Map;

	const onEachFeature = (feature: Feature, layer: Layer) => {
		const name: string = feature.properties?.full_name;
		const dtValue: number = feature.properties?.value;

		layer.bindTooltip(`${name} - ${dtValue}`).openTooltip();
	};

	const setGeoLayerStyle = (feature: Feature) => {
		// Set the style of every regioin on map, returns a style compatible with leaflet

		const dtValue: number = feature.properties?.value;
		const fillVal: string = threshold(dtValue);

		return {
			fillColor: fillVal,
			fillOpacity: dtValue ? Number(DefaultDatalayerOpacity) / 100 : 0,
			color: fillVal,
			weight: 1
		};
	};

	onMount(async () => {
		const L = await import('leaflet');
		const map: Map = L.map('map', { attributionControl: false }).setView(
			MapConstants.initialCenter,
			MapConstants.initialScale
		);
		L.control
			.attribution({
				prefix: 'made in love with <a href="https://leafletjs.com/">Leaflet</a>'
			})
			.addTo(map);

		// initializing map
		await initMap(map);

		const geoJSONLayer = L.geoJSON([], {
			onEachFeature,
			style: setGeoLayerStyle
		});

		// adding geojson to mappa

		features_list.subscribe((val) => {
			L.geoJSON(val).addTo(map);
		});
	});
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
