import { useRow } from "@/stores/root";

export const useJournalById = (journalId: string) => {
	return useRow("journals", journalId, "root");
};
