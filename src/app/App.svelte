<script lang="ts">
	import Choropleth from './Choropleth.svelte';
	import ColorPallette from './common/ColorPallette.svelte';
	import Deploy from './common/Deploy.svelte';
	import OpacitySlider from './common/OpacitySlider.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';

	let renderChoropleth: () => Promise<void>;
	async function vizSubmit() {
		// Dispatch an event to respective child component
		renderChoropleth();
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
		<OpacitySlider />
		<div class="self-end px-2">
			<VizRun />
			<Deploy />
		</div>
		<div class="text-midText text-sm px-1">* mapping of key-data is one to one wrt index</div>
	</form>
	<Choropleth bind:render={renderChoropleth} />
</div>
