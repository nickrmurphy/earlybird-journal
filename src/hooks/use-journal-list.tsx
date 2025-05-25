import {
	useAddRowCallback,
	useTable,
	useRowIds,
	type IJournal,
} from "@/stores/journal";

export const useJournalList = () => {
	const data = useTable("journals");
	const ids = useRowIds("journals");

	const add = useAddRowCallback("journals", (journal: IJournal) => journal, []);

	return {
		data,
		ids,
		actions: {
			add,
		},
	};
};
