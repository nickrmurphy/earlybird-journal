import { Paper } from "@/components/surfaces";
import { Button, JournalCard } from "@/components";
import { useJournals } from "@/hooks/use-journals";
import { Link } from "wouter";

const WelcomeScreen = () => {
	return (
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
						A bullet journal is your personal organization system—a place to
						track your daily tasks, capture thoughts, set goals, and reflect on
						your journey.
					</p>
				</div>
				<div className="text-center space-y-1">
					<Button size="lg" asChild>
						<Link href="/new">Start My First Journal</Link>
					</Button>
					<p className="text-sm text-ink-black/60 mt-2">
						We'll create a journal for this month to get you started
					</p>
				</div>
			</main>
		</Paper>
	);
};

export const HomePage = () => {
	const { rows, isLoading } = useJournals();

	return isLoading ? (
		<div>Loading...</div>
	) : rows.length === 0 ? (
		<WelcomeScreen />
	) : (
		rows.map((row) => (
			<JournalCard
				key={row.id}
				journalId={row.id}
				title={row.title}
				createdAt={row.createdAt}
			/>
		))
	);
};
