<script lang="ts">
	import { IVizRunning } from '../interface';
	import { viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';
	import { batchGeoCode } from './helpers/api';
	import type { geojson } from './helpers/types';

	async function vizSubmit() {
		// Fetch geojson list from geocoding API
		const geojsonList: geojson[] = await batchGeoCode($viz_keys);

		// TODO make data and geojson plot on map

		viz_running.set(IVizRunning.Idle);
	}
</script>

<div class="flex m-auto w-[80%] border-bgLight border-x mt-6">
	<form
		on:submit|preventDefault={vizSubmit}
		class="w-[37%] p-6 flex flex-col space-y-6 items-start border-r border-bgLight"
	>
		<VizSelector />
		<VizInput />
		<div class="self-end px-2">
			<VizRun />
		</div>
	</form>
	<Choropleth />
</div>
