<script lang="ts">
	import { IVizRunning } from '../interface';
	import { features_list, viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';
	import { batchGeoCode } from './helpers/api';
	import type { geojson } from './helpers/types';
	import type { Feature } from 'geojson';

	async function vizSubmit() {
		// Fetch geojson list from geocoding API
		const geojsonList: geojson[] = await batchGeoCode($viz_keys);

		const vizKeyList: string[] = $viz_keys.split(',').map((v) => v.trim());
		const vizValuesList: string[] = $viz_values.split(',').map((v) => v.trim());

		const keyValueMap: Record<string, number> = vizKeyList.reduce((f, key, index) => {
			f[key] = Number(vizValuesList[index]) || 0;
			return f;
		}, {} as Record<string, number>);

		const featureList: Feature[] = geojsonList.map((f) => {
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

		features_list.set(featureList);

		// TODO make data and geojson plot on map

		viz_running.set(IVizRunning.Idle);
	}
</script>

<div class="flex m-auto w-[87%] border-bgLight border-x mt-6">
	<form
		on:submit|preventDefault={vizSubmit}
		class="w-[37%] p-6 flex flex-col space-y-6 items-start border-r border-bgLight"
	>
		<VizSelector />
		<VizInput />
		<div class="self-end px-2">
			<VizRun />
		</div>
		<div class="text-midText text-sm px-1">* mapping of key-data is one to one wrt index</div>
	</form>
	<Choropleth />
</div>
