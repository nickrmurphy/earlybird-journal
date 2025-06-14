import { type VariantProps, cva } from "cva";
import type { Component, ComponentProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

export const paper = cva({
	base: "rounded-lg shadow",
	variants: {
		variant: {
			cream: "bg-paper-cream",
			white: "bg-paper-white",
		},
	},
	defaultVariants: {
		variant: "white",
	},
});

type PaperProps = ComponentProps<"div"> &
	VariantProps<typeof paper> & {
		as?: keyof JSX.IntrinsicElements;
	};

export const Paper: Component<PaperProps> = (props) => {
	return (
		<Dynamic {...props} component={props.as || "div"} class={paper(props)} />
	);
};
