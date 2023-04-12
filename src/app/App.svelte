<script>
	import { IVizRunning } from '../interface';
	import { viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	async function vizSubmit() {
		const res = await fetch(`http://localhost:3000/batch-geocode/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ geo_locations: $viz_keys.split(',').map((item) => item.trim()) })
		});
		const json = await res.json();
		const result = JSON.stringify(json);

		console.log('results is...', result);
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
