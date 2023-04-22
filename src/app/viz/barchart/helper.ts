// It will take data from Visual Panel and give it to barchart function as provided by observablehq.

import { color_pallette, viz_keys, viz_values } from '../../../stores';
import { customPaletteSet } from '../../helpers/color_pallette';
import { trimKeys, trimValues } from '../../helpers/common';

import type { BarChartData, BarChartOptions } from './bar_chart';

import { get } from 'svelte/store';

function prepareOptionsForBarChart(): { data: BarChartData; options: BarChartOptions } {
	const data: BarChartData = trimKeys(get(viz_keys)).map((key: string, i: number) => ({
		key,
		value: trimValues(get(viz_values))[i]
	}));

	return {
		data,
		options: {
			x: (d) => d.key,
			y: (d) => d.value,
			height: 600,
			width: 800,
			marginLeft: 32,
			marginTop: 32,
			color: customPaletteSet[get(color_pallette)][0]
		}
	};
}

export { prepareOptionsForBarChart };
