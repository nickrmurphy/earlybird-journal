import type { FC, PropsWithChildren } from "react";
import {
	Provider,
	useCreateRootPersister,
	useCreateRootStore,
} from "../stores/root";

export const RootStoreContext: FC<PropsWithChildren> = ({ children }) => {
	const rootStore = useCreateRootStore();

	useCreateRootPersister(rootStore);

	return <Provider storesById={{ root: rootStore }}>{children}</Provider>;
};
