import type { Bullet } from "@/types";
import { BulletIcon } from "./bullet-icon";
import type { Component } from "solid-js";

type EntryItemProps = {
	type: Bullet;
	content: string;
	oninput: (value: string) => void;
};

export const EntryItem: Component<EntryItemProps> = (props) => (
	<div class="flex items-baseline gap-4 py-2 text-base last:border-b border-dotted border-ink-black/50">
		<BulletIcon class="size-4 text-graphite my-auto" type={props.type} />
		<input
			class="w-full focus:outline-none"
			value={props.content}
			onInput={(e) => {
				props.oninput(e.currentTarget.value);
			}}
		/>
	</div>
);
