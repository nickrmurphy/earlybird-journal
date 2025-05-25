import { type IJournal, useAddRowCallback, useRootTable } from "@/stores/root";

export const useRootStore = () => {
	const journals = useRootTable("journals", "root");

	const addJournal = useAddRowCallback(
		"journals",
		(journal: IJournal) => journal,
		[],
		"root",
	);

	return {
		journals,
		addJournal,
	};
};
