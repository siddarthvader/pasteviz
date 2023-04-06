import type { LatLngTuple } from 'leaflet';

type IVizType = 'choropleth' | '';
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
