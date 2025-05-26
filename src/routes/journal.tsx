import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { useJournalByIdDb } from "@/hooks/use-journal-by-id";
import { getRelativeTime } from "@/utils/time";
import { LibraryIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export function JournalPage({ journalId }: { journalId: string }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const { row, isLoading } = useJournalByIdDb(journalId);

	useEffect(() => {
		if (scrollRef.current) {
			const scrollWidth = scrollRef.current.scrollWidth;
			const clientWidth = scrollRef.current.clientWidth;
			scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
		}
	}, []);

	return isLoading ? (
		<></>
	) : !row ? (
		<></>
	) : (
		<div
			ref={scrollRef}
			className="overflow-x-auto h-screen no-scrollbar scroll-smooth snap-x snap-mandatory"
		>
			<div className="grid grid-cols-3 gap-5 h-screen py-4 px-2 w-[280vw]">
				<div className="h-full snap-center">
					<Paper
						variant="cream"
						className="flex flex-col items-center justify-center h-full p-6"
					>
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div className="h-full snap-center">
					<Paper variant="white" className="flex flex-col h-full p-6">
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div className="h-full snap-center">
					<Paper variant="cream" className="flex flex-col h-full p-6 gap-4">
						<h2 className="text-xl font-bold font-serif">{row.title}</h2>
						<p>{row.intention}</p>
						<section>
							<h3 className="text-lg font-semibold">Index</h3>
							<ul className="list-disc pl-5">
								<li>Daily Logs</li>
								<li>Monthly Reflections</li>
								<li>Goals</li>
								<li>Ideas</li>
							</ul>
						</section>
						<section className="mt-auto flex items-center justify-between">
							<p className="text-ink-black/70">
								Created {getRelativeTime(row.createdAt)}
							</p>
							<Button variant="secondary" size="sm">
								See all journals
								<LibraryIcon />
							</Button>
						</section>
					</Paper>
				</div>
			</div>
		</div>
	);
}
