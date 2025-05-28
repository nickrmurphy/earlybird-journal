import { Button } from "@/components";
import { BulletIcon } from "@/components/bullet-icon";
import { Paper } from "@/components/surfaces";
import { createEntry, getEntries, getJournal } from "@/resources";
import { getRelativeTime } from "@/utils/time";
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

const BulletList: Component<ComponentProps<"ul"> & { entries: Entry[] }> = (
	props,
) => (
	<ul
		class={cx("divide-y divide-ink-black/50 divide-dotted", props.class)}
		{...props}
	>
		{props.entries.map((entry) => (
			<li
				class={cx(
					"flex items-baseline gap-4 py-2 text-base  last:border-b border-dotted border-ink-black/50",
					entry.type,
				)}
			>
				<BulletIcon class="size-4 text-graphite my-auto" type={entry.type} />
				<span>{entry.content}</span>
			</li>
		))}
	</ul>
);

type BulletTypeButtonProps = Omit<
	ComponentProps<"button">,
	"type" | "active"
> & {
	type: Bullet;
	active?: boolean;
};

const BulletTypeButton: Component<BulletTypeButtonProps> = (props) => (
	<button
		{...props}
		type="button"
		class={cx(
			"hover:bg-black/5 p-1 rounded-full transition-all",
			props.active ? "text-ink-black" : "text-ink-black/50",
		)}
	>
		<BulletIcon type={props.type} class="size-5 " />
	</button>
);

const NewBullet: Component<{ journalId: string }> = (props) => {
	const types: Bullet[] = ["note", "event", "task", "feeling"];
	const [activeType, setActiveType] = createSignal<Bullet>("note");
	const [content, setContent] = createSignal<string>("");

	const handleSubmit = async () => {
		if (!content().trim()) return;

		await createEntry(activeType(), {
			content: content().trim(),
			journalId: props.journalId,
		}).then(() => {
			setContent("");
			setActiveType("note"); // Reset to default type
		});
	};

	return (
		<div class="flex items-baseline gap-4 group">
			<div class="size-4" />
			<div class="w-full flex flex-col gap-2">
				<input
					id="new-bullet-input"
					class="w-full h-fit text-base focus:outline-none hover:border-b border-dotted group-focus-within:border-b pt-2 pb-1 border-black/20 transition-all"
					value={content()}
					oninput={(e) => setContent(e.currentTarget.value)}
					onblur={handleSubmit}
				/>
				<div class="opacity-0 group-focus-within:opacity-100 transition-all flex gap-3 items-center my-auto">
					<Index each={types}>
						{(type) => (
							<BulletTypeButton
								type={type()}
								active={activeType() === type()}
								onClick={() => setActiveType(type())}
							/>
						)}
					</Index>
				</div>
			</div>
		</div>
	);
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
							Add Entry
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
