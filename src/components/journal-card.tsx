import { Paper } from "./surfaces";
import { getRelativeTime } from "@/utils/time";
import { A } from "@solidjs/router";

interface JournalCardProps {
	journalId: string;
	title: string;
	createdAt: Date;
}

export function JournalCard(props: JournalCardProps) {
	return (
		<A
			href={`/journal/${props.journalId}`}
			class="p-4 hover:scale-101 transition-all block"
		>
			<Paper class="w-full h-full">
				<h2 class="text-xl font-bold font-serif">{props.title}</h2>
				<p class="mt-2 text-ink-black/70">
					Created {getRelativeTime(props.createdAt)}
				</p>
			</Paper>
		</A>
	);
}
