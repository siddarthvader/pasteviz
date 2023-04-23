import type { LatLngTuple } from 'leaflet';
import type Choropleth from '$lib/visualisation/choropleth/Choropleth.svelte';
import type BarChart from '$lib/visualisation/barchart/BarChart.svelte';
import type EmptyViz from '$lib/visualisation/EmptyViz.svelte';
import type PieChart from '$lib/visualisation/piechart/pie_chart';

type IVizType = 'choropleth' | '' | 'barchart' | 'piechart';

type IVizComponentType = typeof Choropleth | typeof BarChart | typeof EmptyViz | typeof PieChart;
type IVizKeys = string;
type IVizValues = string;

enum IVizRunning {
	Idle = 'idle',
	Running = 'running'
}

interface iMapContants {
	initialScale: number;
	initialCenter: LatLngTuple;
}

export type { IVizType, IVizKeys, IVizValues, iMapContants };
export { IVizRunning };

export type IVizComponent = {
	component: IVizComponentType;
	value: IVizType;
};

export type ColorPaletteSelectorProps = {
	value: string | undefined;
	width?: string;
	onChange: (cpKey: string) => void;
};

export type ColorPaletteOptionProps = {
	colors: ColorList;
};

export type ColorPaletteSet = {
	[key: string]: ColorList;
};

export type IRenderFn = (() => Promise<void>) | undefined;

export type ColorList = Array<string>;
