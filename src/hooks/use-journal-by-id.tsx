import { useRow } from "@/stores/root";

export const useJournalById = (id: string) => {
	const journal = useRow("journals", id, "root");
	return journal;
};
