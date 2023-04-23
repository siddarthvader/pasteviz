import { DefaultColorPallette } from '$lib/constants';
import type { IVizKeys, IVizType, IVizValues } from '$lib/interface';
import { viz_type, viz_keys, viz_values, color_pallette, opacity_values } from '$lib/store';

function fuelStoreFromURLParams(urlParams: URLSearchParams) {
	console.log("urlParams.get('color_pallette')", urlParams.get('color_pallette'));
	viz_type.set(urlParams.get('type') as IVizType);
	viz_keys.set(urlParams.get('keys') as IVizKeys);
	viz_values.set(urlParams.get('values') as IVizValues);
	color_pallette.set(urlParams.get('color_pallette') || DefaultColorPallette);
	opacity_values.set(Number(urlParams.get('opacity')));
}

export { fuelStoreFromURLParams };
