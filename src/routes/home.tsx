import { useRootStore } from "@/hooks";
import { JournalCard } from "@/components";

export const HomePage = () => {
	const { journalIds, addJournal } = useRootStore();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl font-bold">Welcome to the Journal App</h1>
			<p className="mt-4 text-lg">
				This is a simple journal application built with React and TypeScript.
			</p>
			<p className="mt-2 text-lg">
				You can create, read, update, and delete journal entries.
			</p>
			<button
				type="button"
				onClick={() => {
					console.log("Adding journal");
					addJournal({
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
