import { useRow } from "@/stores/journal";

export const useJournalById = (journalId: string) => {
	return useRow("journals", journalId);
};
