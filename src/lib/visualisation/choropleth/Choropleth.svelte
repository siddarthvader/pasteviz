<script lang="ts" async>
	import type { Map } from 'leaflet';
	import type { Layer, GeoJSON } from 'leaflet';
	import type { ScaleThreshold } from 'd3-scale';
	import type { Geometry, Feature } from 'geojson';
	import type { PathOptions, Control } from 'leaflet';

	import { onMount } from 'svelte';
	import { formatNumber, getThreshold, initLegend, initMap } from './helper';
	import { MapConstants, ScalePositionConstants } from '$lib/constants';
	import { viz_keys, viz_values, color_pallette, viz_running, opacity_values } from '$lib/store';

	import { batchGeoCode } from '$lib/helpers/api';
	import { customPaletteSet } from '$lib/helpers/color_pallette';
	import { IVizRunning } from '$lib/interface';
	import { trimKeys, trimValues } from '$lib/helpers/util';

	export const render = renderFn;

	let leafletMap: Map;
	let geoJSONLayer: GeoJSON<any, Geometry>;
	let threshold: ScaleThreshold<number, string>;
	let legendWrapper: HTMLElement;
	let legendControl: Control;

	onMount(async () => {
		const L = await import('leaflet');
		leafletMap = L.map('map', { attributionControl: false }).setView(
			MapConstants.initialCenter,
			MapConstants.initialScale
		);
		legendControl = L.control({
			position: ScalePositionConstants.BottomRight
		});
		L.control
			.attribution({
				prefix: 'made in love with <a href="https://leafletjs.com/">Leaflet</a>'
			})
			.addTo(leafletMap);

		await initMap(leafletMap);
		legendWrapper = await initLegend();

		geoJSONLayer = L.geoJSON([], {
			onEachFeature,
			style: setGeoLayerStyle
		}).addTo(leafletMap);
	});

	function removeColorLegend() {
		legendWrapper.innerHTML = '';
	}

	function generateLegend() {
		const dataDomain: Array<number> = threshold.domain();

		// removing the existing color legend
		legendWrapper?.innerHTML && removeColorLegend();

		legendControl.onAdd = () => {
			for (let i = 0; i < dataDomain.length; i++) {
				legendWrapper.innerHTML += `
				<div class="flex items-center spacing-2">
					
				<div class="h-5 w-5 flex-shrink-0 inline-block mr-2" style="background:${threshold(
					dataDomain[i] + 1
				)}"></div>
				<div>${formatNumber(dataDomain[i])} - ${
					dataDomain[i + 1] ? formatNumber(dataDomain[i + 1]) : 'Max'
				} </div>
				</div>

				`;
			}
			return legendWrapper;
		};

		legendControl.addTo(leafletMap);
	}

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
		generateLegend();
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

<div id="map" class="w-full h-full" />

<style>
</style>
