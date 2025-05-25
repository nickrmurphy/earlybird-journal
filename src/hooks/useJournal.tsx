import {
	type INote,
	useAddRowCallback,
	useTable,
	useRowIds,
} from "@/stores/journal";

export const useJournal = () => {
	const notes = useTable("notes", "journal");
	const noteIds = useRowIds("notes", "journal");

	const addNote = useAddRowCallback(
		"notes",
		(note: INote) => note,
		[],
		"journal",
	);

	return {
		notes,
		noteIds,
		addNote,
	};
};
