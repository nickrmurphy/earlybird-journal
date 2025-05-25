import { useJournalById } from "@/hooks";
import { Paper } from "./surfaces";
import { getRelativeTime } from "@/utils/time";
import { Link } from "wouter";

interface JournalCardProps {
	journalId: string;
}

export const JournalCard = ({ journalId }: JournalCardProps) => {
	const journal = useJournalById(journalId);
	return (
		<Paper className="p-4" asChild>
			<Link href={`/journal/${journalId}`}>
				<h2 className="text-xl font-bold font-serif">{journal.name}</h2>
				<p className="mt-2 text-gray-600">
					Created{" "}
					{journal.createdAt ? getRelativeTime(journal.createdAt) : "Unknown"}
				</p>
			</Link>
		</Paper>
	);
};
