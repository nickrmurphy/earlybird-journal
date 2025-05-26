import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

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

	return (
		<Dynamic
			component={Comp}
			class={`${variantClass} rounded-lg shadow ${c}`}
			{...rest}
		/>
	);
};
