import type { FC, ComponentPropsWithoutRef, ElementType } from "react";

type PaperVariant = "white" | "cream" | "aged";

type PaperProps<T extends ElementType = "div"> = {
	as?: T;
	variant?: PaperVariant;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantClasses: Record<PaperVariant, string> = {
	white: "bg-paper-white",
	cream: "bg-paper-cream",
	aged: "bg-paper-aged",
};

export const Paper: FC<PaperProps> = ({
	as: Component = "div",
	variant = "white",
	children,
	className = "",
	...props
}) => (
	<Component
		className={`${variantClasses[variant]} shadow-md rounded-lg p-4 ${className}`}
		{...props}
	>
		{children}
	</Component>
);
