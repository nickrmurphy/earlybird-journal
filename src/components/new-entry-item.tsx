import type { Bullet } from "@/types";
import {
	type Component,
	type ComponentProps,
	createSignal,
	Index,
} from "solid-js";
import { BulletIcon } from "./bullet-icon";
import { cx } from "cva";

const types: Bullet[] = ["note", "event", "task", "mood"];

type BulletTypeButtonProps = Omit<
	ComponentProps<"button">,
	"type" | "active"
> & {
	type: Bullet;
	active?: boolean;
};

const BulletTypeButton: Component<BulletTypeButtonProps> = (props) => (
	<button
		{...props}
		type="button"
		class={cx(
			"hover:bg-black/5 p-1 rounded-full transition-all",
			props.active ? "text-ink-black" : "text-ink-black/50",
		)}
	>
		<BulletIcon type={props.type} class="size-5 " />
	</button>
);

export const NewEntryItem: Component<{
	onblur: (type: Bullet, content: string) => void;
}> = (props) => {
	const [activeType, setActiveType] = createSignal<Bullet>("note");
	const [content, setContent] = createSignal<string>("");

	const handleBlur = () => {
		props.onblur(activeType(), content());
		setContent("");
	};

	return (
		<div class="flex items-baseline gap-4 group">
			<div class="size-4" />
			<div class="w-full flex flex-col gap-2">
				<input
					id="new-bullet-input"
					class="w-full h-fit text-base focus:outline-none hover:border-b border-dotted group-focus-within:border-b pt-2 pb-1 border-black/20 transition-all"
					value={content()}
					oninput={(e) => setContent(e.currentTarget.value)}
					onblur={handleBlur}
				/>
				<div class="opacity-0 group-focus-within:opacity-100 transition-all flex gap-3 items-center my-auto">
					<Index each={types}>
						{(type) => (
							<BulletTypeButton
								type={type()}
								active={activeType() === type()}
								onClick={() => setActiveType(type())}
							/>
						)}
					</Index>
				</div>
			</div>
		</div>
	);
};
