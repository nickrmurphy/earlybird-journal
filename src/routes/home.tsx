import { useJournalList } from "@/hooks";
import { Paper } from "@/components/surfaces";
import { Button } from "@/components";

export const HomePage = () => {
	const { actions } = useJournalList();
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
				<div className="text-center">
					<Button
						size="lg"
						onClick={() => {
							const today = new Date();
							const monthNames = [
								"January",
								"February",
								"March",
								"April",
								"May",
								"June",
								"July",
								"August",
								"September",
								"October",
								"November",
								"December",
							];
							const journalName = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

							actions.add({
								name: journalName,
								createdAt: new Date().toISOString(),
							});
						}}
					>
						Start My First Journal
					</Button>
					<p className="text-sm text-ink-black/60 mt-2">
						We'll create a journal for this month to get you started
					</p>
				</div>
			</main>
		</Paper>
	);
};
