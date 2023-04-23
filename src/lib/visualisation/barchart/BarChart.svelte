<script lang="ts">
	import { select } from 'd3-selection';
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

		removeAllChildren(select('#bar-chart').node());
		if (el) select('#bar-chart').node().appendChild(el);
		viz_running.set(IVizRunning.Idle);
	};
</script>

<div class="w-full h-full flex items-center justify-center">
	{#if !el}
		<div class="text-2xl text-midText font-semibold">Select options generate bar chart</div>
	{/if}

	<div id="bar-chart" class="p-4" style:color={customPaletteSet[$color_pallette][0]} />
</div>
