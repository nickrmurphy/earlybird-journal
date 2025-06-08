// Debounce utility: ensures a function is only called after `wait` ms have passed since the last call
// Usage: const debouncedFn = debounce(fn, 500)
// biome-ignore lint/suspicious/noExplicitAny: Generic utility needs to work with any function signature
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait: number,
): T {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	// biome-ignore lint/suspicious/noExplicitAny: Need to store args of unknown type
	let lastArgs: any;
	// biome-ignore lint/suspicious/noExplicitAny: Need to preserve original function's this context and args
	const debounced = function (this: any, ...args: any[]) {
		lastArgs = args;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn.apply(this, lastArgs);
		}, wait);
	};
	return debounced as T;
}
