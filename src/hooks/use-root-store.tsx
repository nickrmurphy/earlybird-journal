import {
	type IJournal,
	useAddRowCallback,
	useTable,
	useRowIds,
} from "@/stores/root";

export const useRootStore = () => {
	const journals = useTable("journals", "root");
	const journalIds = useRowIds("journals", "root");

	const addJournal = useAddRowCallback(
		"journals",
		(journal: IJournal) => journal,
		[],
		"root",
	);

	return {
		journals,
		journalIds,
		addJournal,
	};
};
