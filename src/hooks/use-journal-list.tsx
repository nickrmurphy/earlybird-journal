import {
	type IJournal,
	useAddRowCallback,
	useTable,
	useRowIds,
} from "@/stores/root";

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
