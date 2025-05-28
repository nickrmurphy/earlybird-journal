import {
	CircleCheckIcon,
	CircleDotIcon,
	CircleEqualIcon,
	CircleMinusIcon,
} from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Bullet } from "@/types";

const iconMap = {
	event: CircleDotIcon,
	note: CircleMinusIcon,
	mood: CircleEqualIcon,
	task: CircleCheckIcon,
};

export const BulletIcon: Component<ComponentProps<"svg"> & { type: Bullet }> = (
	props,
) => {
	const Icon = iconMap[props.type] || CircleDotIcon;
	return <Dynamic component={Icon} {...props} />;
};
