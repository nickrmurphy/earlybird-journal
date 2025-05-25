import type { FC, ComponentPropsWithoutRef, ElementType } from "react";
import { Children, cloneElement, isValidElement } from "react";
import clsx from "clsx/lite";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ink";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps<T extends ElementType = "button"> = {
	as?: T;
	asChild?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

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

export const Button: FC<ButtonProps> = ({
	as: Component = "button",
	asChild = false,
	variant = "primary",
	size = "md",
	children,
	className = "",
	...props
}) => {
	const buttonClasses = clsx(
		variantClasses[variant],
		sizeClasses[size],
		"font-sans rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink-blue/50 focus:ring-offset-1 active:scale-[0.98] flex items-center justify-center",
		className,
	);

	if (asChild && children) {
		const child = Children.only(children);
		if (isValidElement(child)) {
			return cloneElement(child, {
				...props,
				...child.props,
				className: clsx(
					buttonClasses,
					(child.props as { className?: string }).className,
				),
			});
		}
	}

	return (
		<Component className={buttonClasses} {...props}>
			{children}
		</Component>
	);
};
