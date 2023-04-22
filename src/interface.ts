import type { LatLngTuple } from 'leaflet';
import type Choropleth from './app/viz/Choropleth.svelte';
import type BarChart from './app/viz/BarChart.svelte';
import type EmptyViz from './app/viz/EmptyViz.svelte';

type IVizType = 'choropleth' | '' | 'barchart';

type IVizComponentType = typeof Choropleth | typeof BarChart | typeof EmptyViz;
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
