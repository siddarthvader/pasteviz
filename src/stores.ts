import { writable, type Writable } from 'svelte/store';
import { IVizRunning, type IVizKeys, type IVizType, type IVizValues } from './interface';

import type { Feature } from 'geojson';

// Currently everything is their separate state
export const viz_type: Writable<IVizType> = writable<IVizType>('');
export const viz_keys: Writable<IVizKeys> = writable<IVizKeys>('');
export const viz_values: Writable<IVizValues> = writable<IVizValues>('');
export const viz_running: Writable<IVizRunning> = writable<IVizRunning>(IVizRunning.Idle);
export const features_list: Writable<Feature[]> = writable<Feature[]>([]);

export const color_pallette: Writable<string> = writable<string>('neutralColorPalette');
