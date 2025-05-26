import { Paper } from "@/components/surfaces";
import { Button, JournalCard } from "@/components";
import { useJournals } from "@/hooks/use-journals";
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
					<p class="text-lg text-ink-black/80">
						A bullet journal is your personal organization system—a place to
						track your daily tasks, capture thoughts, set goals, and reflect on
						your journey.
					</p>
				</div>
				<div class="text-center space-y-1">
					<Button size="lg" as="a" href="/new">
						Start My First Journal
					</Button>
					<p class="text-sm text-ink-black/60 mt-2">
						We'll create a journal for this month to get you started
					</p>
				</div>
			</main>
		</Paper>
	);
};

export function HomePage() {
	const journalsData = useJournals();

	return (
		<Show when={!journalsData().isLoading} fallback={<div>Loading...</div>}>
			<Show
				when={journalsData().rows.length === 0}
				fallback={
					<For each={journalsData().rows}>
						{(row: Record<string, unknown>) => (
							<JournalCard
								journalId={row.id as string}
								title={row.title as string}
								createdAt={row.createdAt as Date}
							/>
						)}
					</For>
				}
			>
				<WelcomeScreen />
			</Show>
		</Show>
	);
}
