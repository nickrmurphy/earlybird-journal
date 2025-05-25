import type { FC, PropsWithChildren } from "react";
import {
	JournalProvider,
	useCreateJournalPersister,
	useCreateJournalStore,
} from "../stores";

export const JournalStoreContext: FC<PropsWithChildren> = ({ children }) => {
	const journalStore = useCreateJournalStore();

	useCreateJournalPersister(journalStore);

	return (
		<JournalProvider storesById={{ journal: journalStore }}>
			{children}
		</JournalProvider>
	);
};
