<script lang="ts">
	import * as d3 from 'd3';
	import BarChart from '../helpers/bar_chart';

	let el: SVGSVGElement;
	const data = [
		{ letter: 'A', frequency: 0.08167 },
		{ letter: 'B', frequency: 0.01492 },
		{ letter: 'C', frequency: 0.02782 },
		{ letter: 'D', frequency: 0.04253 },
		{ letter: 'E', frequency: 0.12702 },
		{ letter: 'F', frequency: 0.02288 },
		{ letter: 'G', frequency: 0.02015 },
		{ letter: 'H', frequency: 0.06094 },
		{ letter: 'I', frequency: 0.06966 },
		{ letter: 'J', frequency: 0.00153 },
		{ letter: 'K', frequency: 0.00772 },
		{ letter: 'L', frequency: 0.04025 },
		{ letter: 'M', frequency: 0.02406 },
		{ letter: 'N', frequency: 0.06749 },
		{ letter: 'O', frequency: 0.07507 },
		{ letter: 'P', frequency: 0.01929 },
		{ letter: 'Q', frequency: 0.00095 },
		{ letter: 'R', frequency: 0.05987 },
		{ letter: 'S', frequency: 0.06327 },
		{ letter: 'T', frequency: 0.09056 },
		{ letter: 'U', frequency: 0.02758 },
		{ letter: 'V', frequency: 0.00978 },
		{ letter: 'W', frequency: 0.0236 },
		{ letter: 'X', frequency: 0.0015 },
		{ letter: 'Y', frequency: 0.01974 },
		{ letter: 'Z', frequency: 0.00074 }
	];

	export const render = () => {
		console.log('triggered');
		console.log('Bar chart component');
		el = BarChart(data, {
			x: (d) => d.letter,
			y: (d) => d.frequency,
			title: undefined,
			xDomain: d3.groupSort(
				data,
				([d]) => -d.frequency,
				(d) => d.letter
			),
			yFormat: undefined,
			yLabel: 'Frequency',
			color: 'red',
			yDomain: [0, 0.15]
		});

		if (el) d3.select('#bar-chart').node().appendChild(el);
	};
</script>

<div class="w-full h-full">
	<div id="bar-chart" />
</div>
