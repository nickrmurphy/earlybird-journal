// Throttle utility: ensures a function is only called at most once every `wait` ms
// Usage: const throttledFn = throttle(fn, 500)
// biome-ignore lint/suspicious/noExplicitAny: Generic utility needs to work with any function signature
export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	wait: number,
): T {
	let lastCall = 0;
	let timeout: ReturnType<typeof setTimeout> | null = null;
	// biome-ignore lint/suspicious/noExplicitAny: Need to store args of unknown type
	let lastArgs: any;

	// biome-ignore lint/suspicious/noExplicitAny: Need to preserve original function's this context and args
	const throttled = function (this: any, ...args: any[]) {
		const now = Date.now();
		lastArgs = args;
		if (now - lastCall >= wait) {
			lastCall = now;
			fn.apply(this, args);
		} else if (!timeout) {
			timeout = setTimeout(
				() => {
					lastCall = Date.now();
					timeout = null;
					fn.apply(this, lastArgs);
				},
				wait - (now - lastCall),
			);
		}
	};
	return throttled as T;
}
