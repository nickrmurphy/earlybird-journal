// Utility functions to convert snake_case keys to camelCase

export function toCamelCase(str: string): string {
	return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function keysToCamelCase<T extends Record<string, unknown>>(
	obj: T,
): Record<string, unknown> {
	const newObj: Record<string, unknown> = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			newObj[toCamelCase(key)] = obj[key];
		}
	}
	return newObj;
}
