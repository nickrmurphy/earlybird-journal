import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore  } from "tinybase/with-schemas";

const journalSchema = {
	meta: {
		id: {
			type: "string",
			default: crypto.randomUUID(),
		},
		name: {
			type: "string",
			default: "Unnamed Journal",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
	},
	notes: {
		title: {
			type: "string",
			default: "Untitled",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		}
	},
} as const;


// Cast the whole module to be schema-based with WithSchemas:
const { useCreatePersister: useCreatePersisterBase, useCreateStore: useCreateStoreBase, Provider } = UiReact as UiReact.WithSchemas<
	[typeof journalSchema, NoValuesSchema]
>;

export { Provider };

export const useCreateStore = () => useCreateStoreBase(() => createStore().setTablesSchema(journalSchema))
export const useCreatePersister = (store: Store<[typeof journalSchema, NoValuesSchema]>, journalId: string) =>
	useCreatePersisterBase(
		store,
		(store) => createIndexedDbPersister(store, `journal-${journalId}`),
		[journalId],
		async (persister) => {
			await persister.startAutoLoad();
			await persister.startAutoSave();
		},
	)
