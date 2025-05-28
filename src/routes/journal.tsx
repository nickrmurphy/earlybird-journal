import { Button } from "@/components";
import { Paper } from "@/components/surfaces";
import { getJournal } from "@/resources";
import { getRelativeTime } from "@/utils/time";
import { createAsync, useParams } from "@solidjs/router";
import { cx } from "cva";
import { LibraryIcon } from "lucide-solid";
import {
	type Component,
	type ComponentProps,
	Show,
	createEffect,
	createSignal,
} from "solid-js";

const Page: Component<ComponentProps<typeof Paper>> = (props) => (
	<Paper
		{...props}
		class={cx("h-full snap-center flex flex-col p-6", props.class)}
	/>
);

export function JournalPage() {
	const params = useParams<{ journalId: string }>();
	const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | undefined>();
	const journalData = createAsync(() => getJournal(params.journalId), {
		initialValue: undefined,
	});
	// Center the scroll position on journal load

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
			when={journalData()}
			fallback={<div class="p-4">Journal not found</div>}
		>
			<div
				ref={setScrollRef}
				class="overflow-x-auto h-screen no-scrollbar scroll-smooth snap-x snap-mandatory"
			>
				<div class="grid grid-cols-3 gap-5 h-screen py-4 px-2 w-[280vw]">
					<Page variant="cream" class="flex flex-col h-full p-6">
						Some journal content for journal ID: {params.journalId}
					</Page>
					<Page variant="white" class="flex flex-col h-full p-6">
						Some journal content for journal ID: {params.journalId}
					</Page>
					<Page variant="cream" class="flex flex-col h-full p-6">
						<h2 class="text-xl font-bold font-serif">{journalData()?.title}</h2>
						<p>{journalData()?.intention}</p>
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
							<p class="text-graphite">
								Created{" "}
								{journalData()?.createdAt &&
									getRelativeTime(journalData()?.createdAt || new Date(0))}
							</p>
							<Button variant="secondary" size="sm">
								See all journals
								<LibraryIcon />
							</Button>
						</section>
					</Page>
				</div>
			</div>
		</Show>
	);
}
