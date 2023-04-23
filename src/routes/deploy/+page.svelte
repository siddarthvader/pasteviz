<script lang="ts">
	import { onMount } from 'svelte';
	import { fuelStoreFromURLParams } from '$lib/helpers/deploy';
	import { viz_type } from '$lib/store';

	import Choropleth from '$lib/visualisation/choropleth/Choropleth.svelte';
	import BarChart from '$lib/visualisation/barchart/BarChart.svelte';
	import EmptyViz from '$lib/visualisation/EmptyViz.svelte';
	import type { IVizComponent } from '$lib/interface';

	const urlParams = new URLSearchParams(window.location.search);

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

	let renderFn: () => Promise<void>;
	let isRendered = false;
	onMount(() => {
		isRendered = true;
		fuelStoreFromURLParams(urlParams);
		if (renderFn) {
			setTimeout(() => {
				renderFn();
			}, 10);
		}
	});
	// Dispatch an event to respective child component
</script>

<div class="w-full flex h-full">
	{#each VizComponentMap as viz}
		{#if $viz_type === viz.value}
			<svelte:component this={viz.component} bind:render={renderFn} />
		{/if}
	{/each}
</div>
