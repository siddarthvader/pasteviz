import type { Geometry } from 'geojson';

export type geojsonLocal = {
	iso_name: string;
	full_name: string;
	geojson: Geometry;
	created_at: Date;
	updated_at: Date;
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
