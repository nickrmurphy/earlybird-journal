import { cva } from "cva";
import type { JSX } from "solid-js";

export const textarea = cva({
	base: "border border-ink-black/50 rounded px-3 py-2 resize-vertical focus:outline-none focus:ring-2 focus:ring-ink-blue/50",
});

export const Textarea = (
	props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => <textarea {...props} class={textarea(props)} />;
