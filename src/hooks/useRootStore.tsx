import { type IJournal, useAddRootRowCallback, useRootTable } from "../stores";

export const useRootStore = () => {
	const journals = useRootTable("journals", "root");

	const addJournal = useAddRootRowCallback(
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
