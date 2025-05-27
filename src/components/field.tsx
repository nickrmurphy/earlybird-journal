import { cva } from "cva";
import type { JSX } from "solid-js";

export const field = cva({
	base: "flex flex-col gap-1",
});

export const Field = (props: JSX.IntrinsicElements["div"]) => (
	<div {...props} class={field(props)} />
);
