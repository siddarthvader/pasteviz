<script>
	import { onMount } from 'svelte';
	import { MapBoundsMax, MapboxConfig, PaneOrder } from '../constants';

	let map;
	onMount(async () => {
		const L = await import('leaflet');
		map = L.map('map').setView([0, 0], 8);
		map.createPane(PaneOrder.baseMap).style.zIndex = '250'; // basemap pane
		map.createPane(PaneOrder.dataLayer).style.zIndex = '450'; // datalayer pane
		map.createPane(PaneOrder.labelLayer).style.zIndex = '620'; // label layer pane

		const baseMapLayer = L.tileLayer(
			`https://api.mapbox.com/styles/v1/${MapboxConfig.username}/${MapboxConfig.styleID}/tiles/{z}/{x}/{y}?access_token=${MapboxConfig.accessToken}`,
			{
				pane: PaneOrder.baseMap,
				noWrap: true,
				bounds: MapBoundsMax
			}
		);

		// Label consiting only labels
		const labelLayer = L.tileLayer(
			`https://api.mapbox.com/styles/v1/${MapboxConfig.username}/${MapboxConfig.labelLayerstyleID}/tiles/{z}/{x}/{y}?access_token=${MapboxConfig.accessToken}`,
			{
				pane: PaneOrder.labelLayer,
				noWrap: true,
				bounds: MapBoundsMax
			}
		);

		map.addLayer(baseMapLayer);
		map.addLayer(labelLayer);
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
