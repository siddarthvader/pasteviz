<script lang="ts" async>
	import { IVizRunning } from '../interface';
	import { color_pallette, viz_keys, viz_running, viz_type, viz_values } from '../stores';
	import Choropleth from './Choropleth.svelte';
	import ColorPallette from './common/ColorPallette.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	import { customPaletteSet } from './helpers/color_pallette';
	import { trimKeys, trimValues } from './helpers/helpers';

	let renderChoropleth: () => Promise<void>;
	async function vizSubmit() {
		// Dispatch an event to respective child component

		renderChoropleth();
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
		<ColorPallette />
		<div class="self-end px-2">
			<VizRun />
		</div>
		<div class="text-midText text-sm px-1">* mapping of key-data is one to one wrt index</div>
	</form>
	<Choropleth bind:render={renderChoropleth} />
</div>
