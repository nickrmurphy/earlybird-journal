import type { FC, ComponentPropsWithoutRef, ElementType } from "react";
import { clsx } from "clsx/lite";
import { Children, cloneElement, isValidElement } from "react";

type LeatherProps<T extends ElementType = "div"> = {
	as?: T;
	asChild?: boolean;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Leather: FC<LeatherProps> = ({
	as: Component = "div",
	asChild = false,
	children,
	className = "",
	...props
}) => {
	const leatherClasses = clsx(
		"shadow-md rounded-lg p-4 bg-leather-black",
		className,
	);

	if (asChild && children) {
		const child = Children.only(children);
		if (isValidElement(child)) {
			return cloneElement(child, {
				...props,
				...child.props,
				className: clsx(
					leatherClasses,
					(child.props as { className?: string }).className,
				),
			});
		}
	}

	return (
		<Component className={leatherClasses} {...props}>
			{children}
		</Component>
	);
};
