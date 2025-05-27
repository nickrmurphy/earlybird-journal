import { Button, JournalCard } from "@/components";
import { Paper } from "@/components/surfaces";
import { getJournals } from "@/resources";
import { createAsync } from "@solidjs/router";
import { For, Show } from "solid-js";

const WelcomeScreen = () => {
	return (
		<Paper
			variant="cream"
			class="fixed inset-1 flex flex-col items-center justify-center"
		>
			<main class="p-4 space-y-8">
				<div class="space-y-4">
					<h1 class="text-3xl font-bold font-serif text-ink-black">
						Welcome to Your Digital Bullet Journal
					</h1>
					<p class="text-lg text-graphite">
						A bullet journal is your personal organization system—a place to
						track your daily tasks, capture thoughts, set goals, and reflect on
						your journey.
					</p>
				</div>
				<div class="text-center space-y-1">
					<Button size="lg" as="a" href="/new">
						Start My First Journal
					</Button>
					<p class="text-sm text-graphite mt-2">
						We'll create a journal for this month to get you started
					</p>
				</div>
			</main>
		</Paper>
	);
};

export function HomePage() {
	const journals = createAsync(() => getJournals(), {
		initialValue: [],
	});

	return (
		<Show when={journals().length > 0} fallback={<WelcomeScreen />}>
			<For each={journals()}>
				{(journal) => (
					<JournalCard
						journalId={journal.id}
						title={journal.title}
						createdAt={journal.createdAt}
					/>
				)}
			</For>
		</Show>
	);
}
