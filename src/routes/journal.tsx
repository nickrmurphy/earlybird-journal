import { Button, EntryItem, NewEntryItem } from "@/components";
import { Paper } from "@/components/surfaces";
import { createEntry, getEntries, getJournal, updateEntry } from "@/resources";
import { getRelativeTime } from "@/utils/time";
import { debounce } from "@/utils/debounce";
import { createAsync, useParams } from "@solidjs/router";
import { cx } from "cva";
import { LibraryIcon, PlusIcon } from "lucide-solid";
import {
	type Component,
	type ComponentProps,
	Index,
	Show,
	createEffect,
	createSignal,
} from "solid-js";
import type { Bullet, Entry } from "@/types";

const Page: Component<ComponentProps<typeof Paper>> = (props) => (
	<Paper
		{...props}
		class={cx(
			"h-full snap-center flex flex-col p-6 overflow-y-auto",
			props.class,
		)}
	/>
);

const BulletList: Component<ComponentProps<"div"> & { entries: Entry[] }> = (
	props,
) => {
	const handleInput = debounce(async (entryId: string, content: string) => {
		await updateEntry(entryId, { content });
	}, 500);

	return (
		<div
			class={cx("divide-y divide-ink-black/50 divide-dotted", props.class)}
			{...props}
		>
			<Index each={props.entries}>
				{(entry) => (
					<EntryItem
						type={entry().type}
						content={entry().content}
						oninput={(value) => handleInput(entry().id, value)}
					/>
				)}
			</Index>
		</div>
	);
};

const NewBullet: Component<{ journalId: string }> = (props) => {
	const handleBlur = async (type: Bullet, content: string) => {
		if (!content.trim()) return;

		await createEntry({
			content: content.trim(),
			journalId: props.journalId,
			type,
		});
	};

	return <NewEntryItem onblur={handleBlur} />;
};

export function JournalPage() {
	const params = useParams<{ journalId: string }>();
	const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | undefined>();
	const journalData = createAsync(() => getJournal(params.journalId), {
		initialValue: undefined,
	});
	const entries = createAsync(() => getEntries(params.journalId), {
		initialValue: [],
	});

	const handleNewEntryButton = () => {
		document.getElementById("new-bullet-input")?.focus();
	};

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
					<Page variant="cream">
						Some journal content for journal ID: {params.journalId}
					</Page>
					<Page variant="white" class="space-y-6 relative flex flex-col">
						<header>
							<h1 class="text-2xl font-bold">
								{new Date().toLocaleDateString()}
							</h1>
						</header>
						<section class="flex-1 flex flex-col">
							<BulletList entries={entries()} />
							<NewBullet journalId={params.journalId} />
						</section>
						<Button
							class="sticky bottom-0 self-end z-10"
							variant="primary"
							onClick={handleNewEntryButton}
						>
							Create an entry
							<PlusIcon />
						</Button>
					</Page>
					<Page variant="cream">
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
							<Show when={journalData()?.createdAt}>
								{(createdAt) => (
									<p class="text-graphite">
										Created {getRelativeTime(createdAt())}
									</p>
								)}
							</Show>
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
