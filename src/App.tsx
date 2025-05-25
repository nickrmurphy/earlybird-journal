import "./App.css";
import { useAddJournalRowCallback, useJournalTable } from "./stores";

function App() {
	const notes = useJournalTable("notes");
	const addNote = useAddJournalRowCallback(
		"notes",
		(values: { title: string }) => {
			return {
				title: values.title,
				created: new Date().toISOString(),
			};
		},
	);

	return (
		<main>
			<h1>Welcome to Tauri + React</h1>
			<button
				type="button"
				onClick={() => {
					addNote();
				}}
			>
				Add Note
			</button>
			<p>{JSON.stringify(notes)}</p>
		</main>
	);
}

export default App;
