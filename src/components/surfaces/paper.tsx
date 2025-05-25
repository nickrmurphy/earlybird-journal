import type { FC, ComponentPropsWithoutRef, ElementType } from "react";
import { clsx } from "clsx/lite";

type PaperVariant = "white" | "cream" | "aged";

type PaperProps<T extends ElementType = "div"> = {
	as?: T;
	variant?: PaperVariant;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantClasses: Record<PaperVariant, string> = {
	white: "bg-paper-white/95",
	cream: "bg-paper-cream/95",
	aged: "bg-paper-aged/95",
};

export const Paper: FC<PaperProps> = ({
	as: Component = "div",
	variant = "white",
	children,
	className = "",
	...props
}) => (
	<Component
		className={clsx(
			variantClasses[variant],
			"shadow-md rounded-lg p-4",
			className,
		)}
		{...props}
	>
		{children}
	</Component>
);
