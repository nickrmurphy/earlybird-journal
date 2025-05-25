import { useRootStore } from "@/hooks";
import { Link } from "wouter";

export const HomePage = () => {
	const { journals, addJournal } = useRootStore();

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
			<p>{JSON.stringify(journals)}</p>

			{Object.entries(journals).map(([id, journal]) => (
				<div key={id} className="mt-4 p-4 border rounded shadow">
					<h2 className="text-2xl font-semibold">{journal.name}</h2>
					<p className="mt-2 text-gray-600">
						Created at: {new Date(journal.createdAt!).toLocaleString()}
					</p>
					<Link
						href={`/journal/${id}`}
						className="mt-2 text-blue-500 hover:underline"
					>
						View Journal
					</Link>
				</div>
			))}
		</div>
	);
};
