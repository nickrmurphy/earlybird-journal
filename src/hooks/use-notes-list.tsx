import {
	type INote,
	useAddRowCallback,
	useTable,
	useRowIds,
} from "@/stores/journal";

export const useNotesList = () => {
	const data = useTable("notes", "journal");
	const ids = useRowIds("notes", "journal");

	const add = useAddRowCallback("notes", (note: INote) => note, [], "journal");

	return {
		data,
		ids,
		actions: {
			add,
		},
	};
};
