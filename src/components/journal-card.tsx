import { Paper } from "./surfaces";
import { getRelativeTime } from "@/utils/time";
import { Link } from "wouter";

interface JournalCardProps {
	journalId: string;
	title: string;
	createdAt: Date;
}

export const JournalCard = ({
	journalId,
	title,
	createdAt,
}: JournalCardProps) => {
	return (
		<Paper className="p-4 hover:scale-101 transition-all" asChild>
			<Link href={`/journal/${journalId}`}>
				<h2 className="text-xl font-bold font-serif">{title}</h2>
				<p className="mt-2 text-ink-black/70">
					Created {getRelativeTime(createdAt)}
				</p>
			</Link>
		</Paper>
	);
};
