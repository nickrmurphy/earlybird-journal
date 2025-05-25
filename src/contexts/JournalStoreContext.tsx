import type { FC, PropsWithChildren } from "react";
import {
	Provider,
	useCreateJournalPersister,
	useCreateJournalStore,
} from "../store";

export const JournalStoreContext: FC<PropsWithChildren> = ({ children }) => {
	const journalStore = useCreateJournalStore();

	useCreateJournalPersister(journalStore);

	return <Provider store={journalStore}>{children}</Provider>;
};
