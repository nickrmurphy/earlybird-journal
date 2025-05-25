import { Link } from "wouter";
import { useRootJournal } from "@/hooks/useRootJournal";

interface JournalCardProps {
	journalId: string;
}

export const JournalCard = ({ journalId }: JournalCardProps) => {
	const journal = useRootJournal(journalId);
	return (
		<div className="mt-4 p-4 border rounded shadow">
			<h2 className="text-2xl font-semibold">{journal.name}</h2>
			<p className="mt-2 text-gray-600">
				Created at:{" "}
				{journal.createdAt
					? new Date(journal.createdAt).toLocaleString()
					: "Unknown"}
			</p>
			<Link
				href={`/journal/${journalId}`}
				className="mt-2 text-blue-500 hover:underline"
			>
				View Journal
			</Link>
		</div>
	);
};
