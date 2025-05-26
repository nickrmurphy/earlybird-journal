import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { Input, Textarea } from "@/components/input";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useCreateJournal } from "@/hooks/use-create-journal";

export const NewJournalPage = () => {
	const [, navigate] = useLocation();
	const { create } = useCreateJournal();

	const handleSubmit = async ({
		title,
		intention,
	}: {
		title: string;
		intention: string;
	}) => {
		// TODO: Replace "clientId" with actual client ID or context
		const [{ id }] = await create({ title, intention, updatedBy: "clientId" });
		navigate(`/journal/${id}`);
	};

	return (
		<Paper asChild variant="white">
			<main className="col-span-2 p-4">
				<NewJournalForm onSubmit={handleSubmit} />
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
