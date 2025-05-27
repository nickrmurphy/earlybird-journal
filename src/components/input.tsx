import { cva } from "cva";
import type { Component, JSX } from "solid-js";

export const input = cva({
	base: "border border-ink-black/50 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-blue/50",
});

export const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (
	props,
) => <input {...props} class={input(props)} />;
