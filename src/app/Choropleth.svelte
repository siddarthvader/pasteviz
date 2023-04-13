<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';
	import { initMap } from './helpers/helpers';
	import { MapConstants } from '../constants';
	import { features_list, viz_keys } from '../stores';

	let map: Map;

	onMount(async () => {
		const L = await import('leaflet');
		const map: Map = L.map('map').setView(MapConstants.initialCenter, MapConstants.initialScale);

		// initializing map
		await initMap(map);

		// adding geojson to mappa

		features_list.subscribe((val) => {
			console.log(val);
			L.geoJSON(val).addTo(map);
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div id="map" class="w-full h-[600px] m-6" />

<style>
</style>
