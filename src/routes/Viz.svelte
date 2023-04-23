<script lang="ts">
	import { viz_type } from '$lib/store';
	import ColorPallette from '$lib/components/ColorPallette.svelte';
	import Deploy from '$lib/components/Deploy.svelte';
	import OpacitySlider from '$lib/components/OpacitySlider.svelte';
	import VizInput from '$lib/components/VizInput.svelte';
	import VizRun from '$lib/components/VizRun.svelte';
	import VizSelector from '$lib/components/VizSelector.svelte';

	import type { IRenderFn, IVizComponent } from '$lib/interface';

	import Choropleth from '$lib/visualisation/choropleth/Choropleth.svelte';
	import BarChart from '$lib/visualisation/barchart/BarChart.svelte';
	import EmptyViz from '$lib/visualisation/EmptyViz.svelte';

	const VizComponentMap: IVizComponent[] = [
		{
			component: EmptyViz,
			value: ''
		},
		{
			component: Choropleth,
			value: 'choropleth'
		},
		{
			component: BarChart,
			value: 'barchart'
		}
	];

	let renderFn: IRenderFn;
	async function vizSubmit() {
		if (renderFn) {
			renderFn();
		}
	}
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

	<!-- {#each VizComponentMap as viz}
		{#if $viz_type === viz.value}
			<svelte:component this={viz.component} bind:render={renderFn} />
		{/if}
	{/each} -->
	{#if $viz_type === 'choropleth'}
		<Choropleth bind:render={renderFn} />
	{/if}
	{#if $viz_type === 'barchart'}
		<BarChart bind:render={renderFn} />
	{/if}
</div>
