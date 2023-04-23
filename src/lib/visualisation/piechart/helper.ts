// It will take data from Visual Panel and give it to barchart function as provided by observablehq.

import { color_pallette, viz_keys, viz_values } from '$lib/store';
import { customPaletteSet } from '$lib/helpers/color_pallette';
import { trimKeys, trimValues } from '$lib/helpers/util';

import type { PieChartData, PieChartOptions } from './pie_chart';

import { get } from 'svelte/store';

function prepareOptionsForPieChart(): { data: PieChartData; options: PieChartOptions } {
	const data: PieChartData = trimKeys(get(viz_keys)).map((key: string, i: number) => ({
		key,
		value: trimValues(get(viz_values))[i]
	}));

	return {
		data,
		options: {
			name: (d) => d.key,
			value: (d) => d.value,
			height: 600,
			width: 800,
			colors: customPaletteSet[get(color_pallette)]
		}
	};
}

export { prepareOptionsForPieChart };
