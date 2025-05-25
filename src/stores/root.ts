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
const { useCreatePersister: useCreatePersisterBase, useCreateStore: useCreateStoreBase, Provider, useTable: useTableBase, useAddRowCallback: useAddRowCallbackBase } = UiReact as UiReact.WithSchemas<
    [typeof rootSchema, NoValuesSchema]
>;

export type {
    IJournal,
}

export { Provider };

export const useCreateRootStore = () => useCreateStoreBase(() => createStore().setTablesSchema(rootSchema))
export const useCreateRootPersister = (store: Store<[typeof rootSchema, NoValuesSchema]>) =>
    useCreatePersisterBase(
        store,
        (store) => createIndexedDbPersister(store, "root"),
        [],
        async (persister) => {
            await persister.startAutoLoad();
            await persister.startAutoSave();
        },
    )
export const useRootTable = useTableBase
export const useAddRowCallback = useAddRowCallbackBase