import type React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
	<label className="flex flex-col gap-1">
		{label && <span className="font-medium">{label}</span>}
		<input
			className="border border-ink-black/50 rounded px-3 py-2 focus:outline-none"
			{...props}
		/>
	</label>
);

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
	<label className="flex flex-col gap-1">
		{label && <span className="font-medium">{label}</span>}
		<textarea
			className="border border-ink-black/50 rounded px-3 py-2 resize-vertical focus:outline-none"
			{...props}
		/>
	</label>
);
