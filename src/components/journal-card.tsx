import { getRelativeTime } from "@/utils/time";
import { A } from "@solidjs/router";
import { paper } from "./surfaces";

interface JournalCardProps {
	journalId: string;
	title: string;
	createdAt: Date;
}

export function JournalCard(props: JournalCardProps) {
	return (
		<A
			href={`/journal/${props.journalId}`}
			class={paper({
				class: "p-4 hover:scale-101 transition-all block w-full h-full",
			})}
			aria-label={`Open journal: ${props.title}`}
		>
			<h2 class="text-xl font-bold font-serif">{props.title}</h2>
			<p class="mt-2 text-graphite">
				Created {getRelativeTime(props.createdAt)}
			</p>
		</A>
	);
}
