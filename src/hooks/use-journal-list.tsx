import {
	useAddRowCallback,
	useTable,
	useRowIds,
	type IJournal,
} from "@/stores/journal";

export const useJournalList = () => {
	const data = useTable("journals", "root");
	const ids = useRowIds("journals", "root");

	const add = useAddRowCallback(
		"journals",
		(journal: IJournal) => journal,
		[],
		"root",
	);

	return {
		data,
		ids,
		actions: {
			add,
		},
	};
};
