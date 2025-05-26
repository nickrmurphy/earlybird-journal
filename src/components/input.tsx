import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["label"]);
	return (
		<label class="flex flex-col gap-1">
			{local.label && <span class="font-medium">{local.label}</span>}
			<input
				class="border border-ink-black/50 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-blue/50"
				{...rest}
			/>
		</label>
	);
}

export interface TextareaProps
	extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

export function Textarea(props: TextareaProps) {
	const [local, rest] = splitProps(props, ["label"]);
	return (
		<label class="flex flex-col gap-1">
			{local.label && <span class="font-medium">{local.label}</span>}
			<textarea
				class="border border-ink-black/50 rounded px-3 py-2 resize-vertical focus:outline-none focus:ring-2 focus:ring-ink-blue/50"
				{...rest}
			/>
		</label>
	);
}
