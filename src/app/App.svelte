<script>
	import { viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	async function vizSubmit() {
		console.log('vizType is...', $viz_type);
		console.log('vizValues is...', $viz_values);
		console.log('vizKeys is...', $viz_keys);
		console.log('vizRunning is...', $viz_running);
		// TODO send all this data to API

		const input = ['IND', 'Pakistan', 'Argentina', 'Italy', 'AUS'];

		const res = await fetch(`http://localhost:3000/batch-geocode/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ geo_locations: input })
		});
		const json = await res.json();
		const result = JSON.stringify(json);

		console.log('results is...', result);
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
