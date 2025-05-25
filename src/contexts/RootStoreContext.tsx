import type { FC, PropsWithChildren } from "react";
import {
	RootProvider,
	useCreateRootPersister,
	useCreateRootStore,
} from "../stores";

export const RootStoreContext: FC<PropsWithChildren> = ({ children }) => {
	const rootStore = useCreateRootStore();

	useCreateRootPersister(rootStore);

	return (
		<RootProvider storesById={{ root: rootStore }}>{children}</RootProvider>
	);
};
