import { useJournalList } from "@/hooks";
import { Paper } from "@/components/surfaces";
import { Button, JournalCard } from "@/components";
import { PlusIcon } from "lucide-react";

const WelcomeScreen = () => (
	<Paper
		variant="cream"
		className="fixed inset-1 flex flex-col items-center justify-center"
	>
		<main className="p-4 space-y-8">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold font-serif text-ink-black">
					Welcome to Your Digital Bullet Journal
				</h1>
				<p className="text-lg text-ink-black/80">
					A bullet journal is your personal organization system—a place to track
					your daily tasks, capture thoughts, set goals, and reflect on your
					journey.
				</p>
			</div>
			<div className="text-center space-y-1">
				<Button size="lg">Start My First Journal</Button>
				<p className="text-sm text-ink-black/60 mt-2">
					We'll create a journal for this month to get you started
				</p>
			</div>
		</main>
	</Paper>
);

export const HomePage = () => {
	const { ids } = useJournalList();
	return ids.length === 0 ? (
		<WelcomeScreen />
	) : (
		<div className="flex h-screen p-2">
			<Paper asChild className="w-64 min-h-full p-4 flex flex-col">
				<aside>
					<Button>
						Create a journal
						<PlusIcon />
					</Button>
				</aside>
			</Paper>
			<main className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 px-5">
				{ids.map((id) => (
					<JournalCard key={id} journalId={id} />
				))}
			</main>
		</div>
	);
};
