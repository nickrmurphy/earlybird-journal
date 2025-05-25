import "./App.css";
import { useAddRowCallback, useTable } from "./store";

function App() {
	const notes = useTable("notes");
	const addNote = useAddRowCallback("notes", (values: { title: string }) => {
		return {
			title: values.title,
			created: new Date().toISOString(),
		};
	});

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
