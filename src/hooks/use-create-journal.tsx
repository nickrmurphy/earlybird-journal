import { useAddRowCallback } from "@/stores/journal";
import type { IJournal } from "@/stores/journal";

type UseCreateJournalArgs = {
	onSuccess?: (rowId: string) => void;
};

export const useCreateJournal = ({
	onSuccess,
}: UseCreateJournalArgs | undefined = {}) => {
	const create = useAddRowCallback(
		"journals",
		(journal: Omit<IJournal, "createdAt">) => ({
			...journal,
			createdAt: new Date().toISOString(),
		}),
		[],
		undefined,
		(rowId) => {
			if (rowId) {
				onSuccess?.(rowId);
			}
		},
	);

	return {
		create,
	};
};
