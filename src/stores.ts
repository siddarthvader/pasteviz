import { writable, type Writable } from 'svelte/store';
import { IVizRunning, type IVizKeys, type IVizType, type IVizValues } from './interface';

import type { Feature } from 'geojson';
import { DefaultColorPallette, DefaultDatalayerOpacity } from './constants';

// Currently everything is their separate state
export const viz_type = writable<IVizType>('');
export const viz_keys = writable<IVizKeys>('');
export const viz_values = writable<IVizValues>('');
export const viz_running = writable<IVizRunning>(IVizRunning.Idle);

export const deploying = writable<IVizRunning>(IVizRunning.Idle);

export const features_list = writable<Feature[]>([]);

export const color_pallette = writable<string>(DefaultColorPallette);

export const opacity_values = writable<number>(DefaultDatalayerOpacity);
