import { Paper } from "@/components/surfaces";
import { useEffect, useRef } from "react";

export function JournalPage({ journalId }: { journalId: string }) {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			const scrollWidth = scrollRef.current.scrollWidth;
			const clientWidth = scrollRef.current.clientWidth;
			scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
		}
	}, []);

	return (
		<div
			ref={scrollRef}
			className="overflow-x-auto h-screen no-scrollbar scroll-smooth snap-x snap-mandatory"
		>
			<div className="grid grid-cols-3 gap-6 h-screen p-2 w-[150vw]">
				<div className="h-full snap-center">
					<Paper
						variant="cream"
						className="flex flex-col items-center justify-center h-full"
					>
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div className="h-full snap-center">
					<Paper
						variant="white"
						className="flex flex-col items-center justify-center h-full"
					>
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div className="h-full snap-center">
					<Paper
						variant="cream"
						className="flex flex-col items-center justify-center h-full"
					>
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
			</div>
		</div>
	);
}
