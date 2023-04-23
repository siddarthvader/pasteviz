<script lang="ts">
	import * as d3 from 'd3';

	import { customPaletteSet } from '$lib/helpers/color_pallette';
	import { color_pallette, viz_running } from '$lib/store';
	import { IVizRunning } from '$lib/interface';
	import { prepareOptionsForPieChart } from './helper';
	import PieChart from './pie_chart';

	let el: SVGSVGElement;

	function removeAllChildren(element: Element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	export const render = () => {
		console.log('here aer we...');
		const { data, options } = prepareOptionsForPieChart();
		el = PieChart(data, options);

		const target = d3.select('#pie-chart');

		if (target) {
			removeAllChildren(target.node() as Element);
		}
		if (el) (target?.node() as Element).appendChild(el);
		viz_running.set(IVizRunning.Idle);
		console.log('here aer we...');
	};
</script>

<div class="w-full h-full flex items-center justify-center">
	{#if !el}
		<div class="text-2xl text-midText font-semibold">Select options generate pie chart</div>
	{/if}

	<div id="pie-chart" class="p-4" style:color={customPaletteSet[$color_pallette][0]} />
</div>
