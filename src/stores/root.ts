import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore } from "tinybase/with-schemas";

interface IJournal {
    name: string;
    createdAt: string;
}

const rootSchema = {
    journals: {
        name: {
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

export type {
    IJournal,
}

export const {
    useCreateRootStore,
    useCreateRootPersister,
    useRootTable,
    useAddRootRowCallback,
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
    useRootTable: UiReactWithSchemas.useTable,
    useAddRootRowCallback: UiReactWithSchemas.useAddRowCallback,
};