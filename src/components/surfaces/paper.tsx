import { splitProps } from "solid-js";
import type { JSX, Component } from "solid-js";

export interface PaperProps extends JSX.HTMLAttributes<HTMLElement> {
	as?: keyof JSX.IntrinsicElements;
	variant?: "cream" | "white";
}

export const Paper: Component<PaperProps> = (props) => {
	const [local, rest] = splitProps(props, ["as", "variant", "class"]);
	const Comp = local.as || "div";
	const c = local.class || "";
	const variantClass =
		local.variant === "cream"
			? "bg-paper-cream border border-ink-black/10"
			: "bg-paper-white border border-ink-black/10";

	// @ts-ignore - Dynamic component typing
	return <Comp class={`${variantClass} rounded-lg shadow ${c}`} {...rest} />;
};
