import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { Input, Textarea } from "@/components/input";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useCreateJournal } from "@/hooks";
import { useLocation } from "wouter";

export const NewJournalPage = () => {
	const [, navigate] = useLocation();
	const { create } = useCreateJournal({
		onSuccess: (rowId) => {
			navigate(`/journals/${rowId}`);
		},
	});

	return (
		<Paper asChild variant="white">
			<main className="col-span-2 p-4">
				<NewJournalForm onSubmit={create} />
			</main>
		</Paper>
	);
};

function NewJournalForm({
	onSubmit,
}: {
	onSubmit: ({
		title,
		intention,
	}: { title: string; intention: string }) => void;
}) {
	const [title, setTitle] = useState("");
	const [intention, setIntention] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ title, intention });
	};

	return (
		<form
			className="flex flex-col gap-4 mt-6"
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<Input
				label="Title"
				type="text"
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Journal title"
				required
			/>
			<Textarea
				label="Intention"
				name="intention"
				rows={6}
				value={intention}
				onChange={(e) => setIntention(e.target.value)}
				placeholder="What is your intention for this journal?"
				required
			/>
			<div>
				<Button type="submit">
					Continue <ArrowRightIcon />
				</Button>
			</div>
		</form>
	);
}
