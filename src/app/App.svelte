<script>
	import { viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	function vizSubmit() {
		console.log('vizType is...', $viz_type);
		console.log('vizValues is...', $viz_values);
		console.log('vizKeys is...', $viz_keys);
		console.log('vizRunning is...', $viz_running);
		// TODO send all this data to API
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
