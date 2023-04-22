<script lang="ts">
	import { viz_type } from '../stores';
	import Choropleth from './viz/Choropleth.svelte';
	import ColorPallette from './common/ColorPallette.svelte';
	import Deploy from './common/Deploy.svelte';
	import OpacitySlider from './common/OpacitySlider.svelte';
	import VizInput from './common/VizInput.svelte';
	import VizRun from './common/VizRun.svelte';
	import VizSelector from './common/VizType.svelte';
	import EmptyViz from './viz/EmptyViz.svelte';

	let renderChoropleth: () => Promise<void>;
	async function vizSubmit() {
		// Dispatch an event to respective child component
		renderChoropleth();
	}

	console.log($viz_type);
</script>

<div class="flex m-auto w-[87%] border-bgLight border-x h-[calc(100vh-100px)]">
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
	{#if $viz_type == ''}
		<EmptyViz />
	{/if}
	{#if $viz_type === 'choropleth'}
		<Choropleth bind:render={renderChoropleth} />
	{/if}
</div>
