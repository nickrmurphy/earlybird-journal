import { type VariantProps, cva } from "cva";
import type { JSX } from "solid-js";

export const button = cva({
	base: "font-sans rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink-blue/50 focus:ring-offset-1 active:scale-98 flex items-center justify-center",
	variants: {
		variant: {
			primary: "bg-acrylic-black text-ink-white shadow-md border-transparent",
			secondary: "bg-acrylic-white text-ink-black shadow-sm border-transparent",
		},
		size: {
			sm: "px-3 py-1.5 text-sm [&>svg]:w-3.5 [&>svg]:h-3.5 gap-2",
			md: "px-4 py-2 text-base [&>svg]:w-4 [&>svg]:h-4 gap-2",
			lg: "px-6 py-3 text-lg",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof button>;

export function Button(props: ButtonProps) {
	return <button {...props} class={button(props)} />;
}
