import type { FC, ComponentPropsWithoutRef, ElementType } from "react";
import { clsx } from "clsx/lite";
import { Children, cloneElement, isValidElement } from "react";

type PaperVariant = "white" | "cream" | "aged";

type PaperProps<T extends ElementType = "div"> = {
	as?: T;
	asChild?: boolean;
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
	asChild = false,
	variant = "white",
	children,
	className = "",
	...props
}) => {
	const paperClasses = clsx(
		variantClasses[variant],
		"shadow-md rounded-lg p-4",
		className,
	);

	if (asChild && children) {
		const child = Children.only(children);
		if (isValidElement(child)) {
			return cloneElement(child, {
				...props,
				...child.props,
				className: clsx(
					paperClasses,
					(child.props as { className?: string }).className,
				),
			});
		}
	}

	return (
		<Component className={paperClasses} {...props}>
			{children}
		</Component>
	);
};
