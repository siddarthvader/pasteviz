<script lang="ts">
	import * as d3 from 'd3';
	import BarChart from './bar_chart';
	import { prepareOptionsForBarChart } from './helper';
	import { customPaletteSet } from '$lib/helpers/color_pallette';
	import { color_pallette, viz_running } from '$lib/store';
	import { IVizRunning } from '$lib/interface';

	let el: SVGSVGElement;

	function removeAllChildren(element: Element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	export const render = () => {
		const { data, options } = prepareOptionsForBarChart();
		el = BarChart(data, options);

		const target = d3.select('#bar-chart');

		if (target) {
			removeAllChildren(target.node() as Element);
		}
		if (el) (target?.node() as Element).appendChild(el);
		viz_running.set(IVizRunning.Idle);
	};
</script>

<div class="w-full h-full flex items-center justify-center">
	{#if !el}
		<div class="text-2xl text-midText font-semibold">Select options generate bar chart</div>
	{/if}

	<div id="bar-chart" class="p-4" style:color={customPaletteSet[$color_pallette][0]} />
</div>
