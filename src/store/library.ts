import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore } from "tinybase/with-schemas";
import { journalSchema } from "./schema";

// Cast the whole module to be schema-based with WithSchemas:
const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
    [typeof journalSchema, NoValuesSchema]
>;

// Deconstruct to access the hooks and components you need:
export const { useCreateStore, useRow, useTable, useCreatePersister, Provider, useStore, useSetRowCallback, useAddRowCallback } =
    UiReactWithSchemas;

export const useCreateJournalStore = () =>
    useCreateStore(() => createStore().setTablesSchema(journalSchema));
export const useCreateJournalPersister = (
    store: Store<[typeof journalSchema, NoValuesSchema]>,
) =>
    useCreatePersister(
        store,
        (store) => createIndexedDbPersister(store, "journal"),
        [],
        async (persister) => {
            await persister.startAutoLoad();
            await persister.startAutoSave();
        },
    );
