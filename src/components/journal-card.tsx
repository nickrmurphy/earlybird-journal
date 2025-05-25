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
		<Paper className="p-4 hover:scale-101 transition-all" asChild>
			<Link href={`/journal/${journalId}`}>
				<h2 className="text-xl font-bold font-serif">{journal.title}</h2>
				<p className="mt-2 text-ink-black/70">
					Created{" "}
					{journal.createdAt ? getRelativeTime(journal.createdAt) : "Unknown"}
				</p>
			</Link>
		</Paper>
	);
};
