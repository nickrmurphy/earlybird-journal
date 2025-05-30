import type { Bullet } from "@/types";
import { BulletIcon } from "./bullet-icon";
import type { Component } from "solid-js";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, Show } from "solid-js";
import { BULLET_TYPES } from "@/constants";
import { Trash2Icon } from "lucide-solid";
import type { Api } from "@zag-js/menu";
import type { JSX } from "solid-js";

type EntryItemProps = {
	type: Bullet;
	content: string;
	oninput: (value: string) => void;
};

const labelMap: Record<Bullet, string> = {
	note: "Note",
	event: "Event",
	task: "Task",
	mood: "Mood",
};

const BulletTrigger: Component<{ api: Api; type: Bullet }> = (props) => (
	<button
		type="button"
		class="rounded-full p-0.5 hover:bg-black/10 my-auto focus:outline-none"
		{...props.api.getTriggerProps()}
	>
		<BulletIcon class="size-4 text-graphite my-auto" type={props.type} />
	</button>
);

const BulletOptions: Component<{ api: Api }> = (props) => (
	<div class="bg-paper-white rounded-lg shadow-lg w-full border-black/10 divide-y border divide-black/10">
		<div class="text-sm text-graphite px-2 py-2">Change to...</div>
		{BULLET_TYPES.map((type) => (
			<div
				{...props.api.getItemProps({ value: type })}
				class="hover:bg-black/10 flex items-center gap-3 px-2 py-1.5 text-sm first:rounded-t-lg last:rounded-b-lg transition-all cursor-default"
			>
				{labelMap[type]}
				<BulletIcon class="size-4 ms-auto" type={type} />
			</div>
		))}
	</div>
);

const ActionOptions: Component<{ api: Api }> = (props) => (
	<div class="bg-paper-white rounded-lg shadow-lg w-full border border-black/10 mt-2 transition-all">
		<div
			{...props.api.getItemProps({ value: "delete" })}
			class="px-2 py-1.5 text-sm text-ink-red hover:bg-black/10 rounded-lg flex items-center gap-3 cursor-default"
		>
			Delete
			<Trash2Icon class="size-4 ms-auto" />
		</div>
	</div>
);

const EntryContent: Component<{ api: Api; children: JSX.Element }> = (
	props,
) => (
	<div {...props.api.getPositionerProps()}>
		<div {...props.api.getContentProps()} class="focus:outline-none w-[15ch]">
			<Show when={props.api.open}>{props.children}</Show>
		</div>
	</div>
);

const EntryInput: Component<{
	content: string;
	oninput: (value: string) => void;
}> = (props) => (
	<input
		class="w-full focus:outline-none"
		value={props.content}
		onInput={(e) => {
			props.oninput(e.currentTarget.value);
		}}
	/>
);

export const EntryItem: Component<EntryItemProps> = (props) => {
	const service = useMachine(menu.machine, {
		id: createUniqueId(),
		onSelect: (value) => {
			console.log("Selected value:", value);
		},
	});
	const api = createMemo(() => menu.connect(service, normalizeProps));

	return (
		<div class="flex items-baseline gap-4 py-2 text-base last:border-b border-dotted border-ink-black/50">
			<BulletTrigger api={api()} type={props.type} />
			<EntryContent api={api()}>
				<BulletOptions api={api()} />
				<ActionOptions api={api()} />
			</EntryContent>
			<EntryInput content={props.content} oninput={props.oninput} />
		</div>
	);
};
