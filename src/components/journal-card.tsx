import { useJournalById } from "@/hooks";
import { Leather } from "./surfaces";
import { getRelativeTime } from "@/utils/time";
import { Link } from "wouter";

interface JournalCardProps {
	journalId: string;
}

export const JournalCard = ({ journalId }: JournalCardProps) => {
	const journal = useJournalById(journalId);
	return (
		<Leather className="p-4  hover:scale-101 transition-all" asChild>
			<Link href={`/journal/${journalId}`}>
				<h2 className="text-xl font-bold font-serif text-paper-white">
					{journal.name}
				</h2>
				<p className="mt-2 text-paper-aged">
					Created{" "}
					{journal.createdAt ? getRelativeTime(journal.createdAt) : "Unknown"}
				</p>
			</Link>
		</Leather>
	);
};
