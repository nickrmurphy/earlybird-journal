import { useTable, useRowIds } from "@/stores/journal";

export const useJournalList = () => {
	const data = useTable("journals");
	const ids = useRowIds("journals");

	return {
		data,
		ids,
	};
};
