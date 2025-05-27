import { cva } from "cva";
import type { Component, JSX } from "solid-js";

const label = cva({
	base: "font-medium text-ink-black",
});

export const Label: Component<JSX.HTMLAttributes<HTMLLabelElement>> = (
	props,
) => (
	// biome-ignore lint/a11y/noLabelWithoutControl: <shared component>
	<label {...props} class={label(props)} />
);
