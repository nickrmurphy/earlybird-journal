import { splitProps } from "solid-js";
import type { JSX } from "solid-js";
import clsx from "clsx/lite";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ink";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps<T extends keyof JSX.IntrinsicElements = "button"> = {
	as?: T;
	variant?: ButtonVariant;
	size?: ButtonSize;
	children?: JSX.Element;
	class?: string;
	className?: string;
} & JSX.IntrinsicElements[T];

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-leather-black text-paper-white hover:bg-leather-black/90 shadow-md",
	secondary:
		"bg-paper-cream/90 text-ink-black border border-ink-black/30 hover:bg-paper-cream shadow-sm",
	ghost:
		"text-ink-black hover:bg-paper-cream/50 border border-transparent hover:border-ink-black/10",
	ink: "text-ink-blue hover:text-ink-blue/80 underline decoration-1 underline-offset-2",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-3 py-1.5 text-sm [&>svg]:w-3.5 [&>svg]:h-3.5 gap-2",
	md: "px-4 py-2 text-base [&>svg]:w-4 [&>svg]:h-4 gap-2",
	lg: "px-6 py-3 text-lg",
};

export function Button<T extends keyof JSX.IntrinsicElements = "button">(
	props: ButtonProps<T>,
) {
	const [local, rest] = splitProps(props, [
		"as",
		"variant",
		"size",
		"children",
		"class",
		"className",
	]);
	const Comp = (local.as || "button") as keyof JSX.IntrinsicElements;
	const c = local.class || local.className || "";
	const buttonClasses = clsx(
		variantClasses[local.variant || "primary"],
		sizeClasses[local.size || "md"],
		"font-sans rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink-blue/50 focus:ring-offset-1 active:scale-[0.98] flex items-center justify-center",
		c,
	);

	// Use JSX as any to avoid type error for Comp
	return (
		<>
			{
				// @ts-expect-error: Comp is a dynamic tag
				<Comp class={buttonClasses} {...rest}>
					{local.children}
				</Comp>
			}
		</>
	);
}
