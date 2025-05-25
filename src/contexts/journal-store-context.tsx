import type { FC, PropsWithChildren } from "react";
import { Provider, useCreatePersister, useCreateStore } from "@/stores/journal";

export const JournalStoreContext: FC<PropsWithChildren> = ({ children }) => {
	const journalStore = useCreateStore();

	useCreatePersister(journalStore);

	return <Provider store={journalStore}>{children}</Provider>;
};
