import clsx from "clsx/lite";
import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

export interface PaperProps extends JSX.HTMLAttributes<HTMLElement> {
	as?: keyof JSX.IntrinsicElements;
	variant?: "cream" | "white";
}

export const Paper: Component<PaperProps> = (props) => {
	const [local, rest] = splitProps(props, ["as", "variant", "class"]);

	const variantClass =
		local.variant === "cream"
			? "bg-paper-cream border border-ink-black/10"
			: "bg-paper-white border border-ink-black/10";

	const className = clsx(variantClass, "rounded-lg shadow", local.class);

	return <Dynamic component={local.as || "div"} class={className} {...rest} />;
};
