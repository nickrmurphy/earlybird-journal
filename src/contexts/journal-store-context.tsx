import type { FC, PropsWithChildren } from "react";
import { Provider, useCreatePersister, useCreateStore } from "@/stores/journal";

export const JournalStoreContext: FC<
	PropsWithChildren & { journalId: string }
> = ({ children, journalId }) => {
	const journalStore = useCreateStore();

	useCreatePersister(journalStore, journalId);

	return <Provider storesById={{ journal: journalStore }}>{children}</Provider>;
};
