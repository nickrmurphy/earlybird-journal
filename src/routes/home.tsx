import { useJournalList } from "@/hooks";
import { JournalCard } from "@/components";
import { Paper } from "@/components/surfaces";

export const HomePage = () => {
	const { ids: journalIds, actions } = useJournalList();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Paper>
				<h1 className="text-4xl font-bold">Welcome to the Journal App</h1>
				<p className="mt-4 text-lg">
					This is a simple journal application built with React and TypeScript.
				</p>
				<p className="mt-2 text-lg">
					You can create, read, update, and delete journal entries.
				</p>
			</Paper>
			<button
				type="button"
				onClick={() => {
					console.log("Adding journal");
					actions.add({
						name: "New Journal",
						createdAt: new Date().toISOString(),
					});
				}}
			>
				Add journal
			</button>
			{journalIds.map((id) => (
				<JournalCard key={id} journalId={id} />
			))}
		</div>
	);
};
