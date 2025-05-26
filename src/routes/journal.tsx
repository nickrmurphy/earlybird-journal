import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { createJournalByIdResource } from "@/resources";
import { getRelativeTime } from "@/utils/time";
import { useParams } from "@solidjs/router";
import { LibraryIcon } from "lucide-solid";
import { Show, createEffect, createSignal } from "solid-js";

export function JournalPage() {
	const params = useParams<{ journalId: string }>();
	const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | undefined>();
	const journalData = createJournalByIdResource(params.journalId);

	createEffect(() => {
		const ref = scrollRef();
		if (ref) {
			const scrollWidth = ref.scrollWidth;
			const clientWidth = ref.clientWidth;
			ref.scrollLeft = (scrollWidth - clientWidth) / 2;
		}
	});

	return (
		<Show
			when={!journalData.isLoading}
			fallback={<div class="p-4">Loading journal...</div>}
		>
			<Show
				when={!journalData.error}
				fallback={
					<div class="p-4 text-red-600">
						Error loading journal: {journalData.error?.message}
					</div>
				}
			>
				<Show
					when={journalData.journal}
					fallback={<div class="p-4">Journal not found</div>}
				>
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
									Some journal content for journal ID: {params.journalId}
								</Paper>
							</div>
							<div class="h-full snap-center">
								<Paper variant="white" class="flex flex-col h-full p-6">
									Some journal content for journal ID: {params.journalId}
								</Paper>
							</div>
							<div class="h-full snap-center">
								<Paper variant="cream" class="flex flex-col h-full p-6 gap-4">
									<h2 class="text-xl font-bold font-serif">
										{journalData.journal?.title}
									</h2>
									<p>{journalData.journal?.intention}</p>
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
											Created{" "}
											{journalData.journal?.createdAt &&
												getRelativeTime(journalData.journal.createdAt)}
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
				</Show>
			</Show>
		</Show>
	);
}
