import { useJournalById } from "@/hooks";
import { Paper } from "./surfaces";
import { getRelativeTime } from "@/utils/time";

interface JournalCardProps {
	journalId: string;
}

export const JournalCard = ({ journalId }: JournalCardProps) => {
	const journal = useJournalById(journalId);
	return (
		<Paper className="mt-4 p-4 border rounded shadow">
			<h2 className="text-xl font-bold font-serif">{journal.name}</h2>
			<p className="mt-2 text-gray-600">
				Created{" "}
				{journal.createdAt ? getRelativeTime(journal.createdAt) : "Unknown"}
			</p>
		</Paper>
	);
};
