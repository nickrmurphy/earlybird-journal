import type { FC, PropsWithChildren } from "react";
import {
	JournalProvider,
	useCreateJournalPersister,
	useCreateJournalStore,
} from "../stores";

export const JournalStoreContext: FC<
	PropsWithChildren & { journalId: string }
> = ({ children, journalId }) => {
	const journalStore = useCreateJournalStore();

	useCreateJournalPersister(journalStore, journalId);

	return (
		<JournalProvider storesById={{ journal: journalStore }}>
			{children}
		</JournalProvider>
	);
};
