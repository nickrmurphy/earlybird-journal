import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore } from "tinybase/with-schemas";

const rootSchema = {
    journals: {
        id: {
            type: "string",
        },
        createdAt: {
            type: "string",
        }
    }
} as const;


// Cast the whole module to be schema-based with WithSchemas:
const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
    [typeof rootSchema, NoValuesSchema]
>;

export const {
    useCreateRootStore,
    useCreateRootPersister,
    RootProvider,
} = {
    useCreateRootStore: () => UiReactWithSchemas.useCreateStore(() => createStore().setTablesSchema(rootSchema)),
    useCreateRootPersister: (store: Store<[typeof rootSchema, NoValuesSchema]>) =>
        UiReactWithSchemas.useCreatePersister(
            store,
            (store) => createIndexedDbPersister(store, "root"),
            [],
            async (persister) => {
                await persister.startAutoLoad();
                await persister.startAutoSave();
            },
        ),
    RootProvider: UiReactWithSchemas.Provider,
};