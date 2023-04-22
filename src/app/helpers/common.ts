function trimKeys(keyString: string): string[] {
	return keyString.split(',').map((v) => v.trim());
}
function trimValues(valString: string): number[] {
	return valString.split(',').map((v) => Number(v.trim()) || 0);
}

export { trimKeys, trimValues };
