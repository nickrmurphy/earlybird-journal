// Debounce utility: ensures a function is only called after `wait` ms have passed since the last call
// Usage: const debouncedFn = debounce(fn, 500)
export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: any;
    const debounced = function (this: any, ...args: any[]) {
        lastArgs = args;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, lastArgs);
        }, wait);
    };
    return debounced as T;
}
