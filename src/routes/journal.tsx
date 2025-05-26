import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { useJournalById } from "@/hooks";
import { getRelativeTime } from "@/utils/time";
import { LibraryIcon } from "lucide-solid";
import { createEffect, createSignal } from "solid-js";

export function JournalPage({ journalId }: { journalId: string }) {
	const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | undefined>();
	const journalData = useJournalById(journalId);

	createEffect(() => {
		const ref = scrollRef();
		if (ref) {
			const scrollWidth = ref.scrollWidth;
			const clientWidth = ref.clientWidth;
			ref.scrollLeft = (scrollWidth - clientWidth) / 2;
		}
	});

	const { row, isLoading } = journalData();

	return isLoading ? (
		<></>
	) : !row ? (
		<></>
	) : (
		<div
			ref={setScrollRef}
			class="overflow-x-auto h-screen no-scrollbar scroll-smooth snap-x snap-mandatory"
		>
			<div class="grid grid-cols-3 gap-5 h-screen py-4 px-2 w-[280vw]">
				<div class="h-full snap-center">
					<Paper
						variant="cream"
						class="flex flex-col items-center justify-center h-full p-6"
					>
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div class="h-full snap-center">
					<Paper variant="white" class="flex flex-col h-full p-6">
						Some journal content for journal ID: {journalId}
					</Paper>
				</div>
				<div class="h-full snap-center">
					<Paper variant="cream" class="flex flex-col h-full p-6 gap-4">
						<h2 class="text-xl font-bold font-serif">{row.title as string}</h2>
						<p>{row.intention as string}</p>
						<section>
							<h3 class="text-lg font-semibold">Index</h3>
							<ul class="list-disc pl-5">
								<li>Daily Logs</li>
								<li>Monthly Reflections</li>
								<li>Goals</li>
								<li>Ideas</li>
							</ul>
						</section>
						<section class="mt-auto flex items-center justify-between">
							<p class="text-ink-black/70">
								Created {getRelativeTime(row.createdAt as Date)}
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
