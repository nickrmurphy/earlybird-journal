import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore } from "tinybase/with-schemas";

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
const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
	[typeof journalSchema, NoValuesSchema]
>;

export const {
	useCreateJournalStore,
	useJournalRow,
	useJournalTable,
	useCreateJournalPersister,
	useJournalStore,
	useSetJournalRowCallback,
	useAddJournalRowCallback,
	JournalProvider,
} = {
	useCreateJournalStore: () => UiReactWithSchemas.useCreateStore(() => createStore().setTablesSchema(journalSchema)),
	useCreateJournalPersister: (store: Store<[typeof journalSchema, NoValuesSchema]>, journalId: string) =>
		UiReactWithSchemas.useCreatePersister(
			store,
			(store) => createIndexedDbPersister(store, `journal-${journalId}`),
			[journalId],
			async (persister) => {
				await persister.startAutoLoad();
				await persister.startAutoSave();
			},
		),
	useJournalRow: UiReactWithSchemas.useRow,
	useJournalTable: UiReactWithSchemas.useTable,
	useJournalStore: UiReactWithSchemas.useStore,
	useSetJournalRowCallback: UiReactWithSchemas.useSetRowCallback,
	useAddJournalRowCallback: UiReactWithSchemas.useAddRowCallback,
	JournalProvider: UiReactWithSchemas.Provider,
};