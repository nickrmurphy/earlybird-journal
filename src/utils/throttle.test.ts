import { beforeEach, describe, expect, it, vi } from "vitest";
import { throttle } from "./throttle";

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("throttle", () => {
	let fn: ReturnType<typeof vi.fn>;
	beforeEach(() => {
		fn = vi.fn();
	});

	it("calls the function immediately on first call", () => {
		const throttled = throttle(fn, 100);
		throttled("a");
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith("a");
	});

	it("throttles subsequent calls within wait period", async () => {
		const throttled = throttle(fn, 100);
		throttled("a");
		throttled("b");
		throttled("c");
		expect(fn).toHaveBeenCalledTimes(1);
		await wait(110);
		expect(fn).toHaveBeenCalledTimes(2);
		expect(fn).toHaveBeenLastCalledWith("c");
	});

	it("calls with latest arguments after wait period", async () => {
		const throttled = throttle(fn, 50);
		throttled(1);
		throttled(2);
		throttled(3);
		await wait(60);
		expect(fn).toHaveBeenCalledTimes(2);
		expect(fn).toHaveBeenLastCalledWith(3);
	});

	it("does not call again if not invoked after wait period", async () => {
		const throttled = throttle(fn, 50);
		throttled(1);
		await wait(60);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("preserves 'this' context", async () => {
		const context = {
			value: 42,
			// biome-ignore lint/suspicious/noExplicitAny: Testing context preservation with any type
			fn: function (this: any, x: number) {
				return this.value + x;
			},
		};
		const spy = vi.spyOn(context, "fn");
		const throttled = throttle(context.fn, 50);
		throttled.call(context, 8);
		await wait(60);
		expect(spy).toHaveBeenCalledWith(8);
	});
});
