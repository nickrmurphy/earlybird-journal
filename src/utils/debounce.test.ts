import { beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("debounce", () => {
	let fn: ReturnType<typeof vi.fn>;
	beforeEach(() => {
		fn = vi.fn();
	});

	it("calls the function after the wait period", async () => {
		const debounced = debounce(fn, 50);
		debounced("a");
		expect(fn).not.toHaveBeenCalled();
		await wait(60);
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith("a");
	});

	it("only calls the function once for rapid calls", async () => {
		const debounced = debounce(fn, 50);
		debounced("a");
		debounced("b");
		debounced("c");
		await wait(60);
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith("c");
	});

	it("calls again if invoked after wait period", async () => {
		const debounced = debounce(fn, 30);
		debounced(1);
		await wait(40);
		debounced(2);
		await wait(40);
		expect(fn).toHaveBeenCalledTimes(2);
		expect(fn).toHaveBeenLastCalledWith(2);
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
		const debounced = debounce(context.fn, 20);
		debounced.call(context, 8);
		await wait(30);
		expect(spy).toHaveBeenCalledWith(8);
	});
});
