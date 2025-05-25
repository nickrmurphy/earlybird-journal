import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import type { NoValuesSchema } from "tinybase/with-schemas";
import { type Store, createStore } from "tinybase/with-schemas";

const storeSchema = {
	journals: {
		title: {
			type: "string",
			default: "Unnamed Journal",
		},
		intention: {
			type: "string",
			default: "-",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		}
	},
	day: {
		journalId: {
			type: "string",
			default: "",
		},
		title: {
			type: "string",
			default: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
		},
		date: {
			type: "string", // YYYY-MM-DD - the day this journal belongs to
			default: new Date().toISOString().split('T')[0],
		},
	},
	notes: {
		journalId: {
			type: "string",
			default: "",
		},
		content: {
			type: "string",
			default: "",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
		date: {
			type: "string", // YYYY-MM-DD - the day this note belongs to
			default: new Date().toISOString().split('T')[0],
		},
	},
	actions: {
		journalId: {
			type: "string",
			default: "",
		},
		content: {
			type: "string",
			default: "",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
		originalDate: {
			type: "string", // YYYY-MM-DD - when this action was first created
			default: new Date().toISOString().split('T')[0],
		},
		date: {
			type: "string", // YYYY-MM-DD - current scheduled date
			default: new Date().toISOString().split('T')[0],
		},
		status: {
			type: "string", // "incomplete" | "complete" | "canceled"
			default: "incomplete",
		},
	},
	moods: {
		journalId: {
			type: "string",
			default: "",
		},
		content: {
			type: "string",
			default: "",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
		date: {
			type: "string", // YYYY-MM-DD - the day this mood belongs to
			default: new Date().toISOString().split('T')[0],
		},
		level: {
			type: "number", // 1-10 (1 bad - 5 neutral - 10 good)
			default: 5,
		},
	},
	events: {
		journalId: {
			type: "string",
			default: "",
		},
		content: {
			type: "string",
			default: "",
		},
		createdAt: {
			type: "string",
			default: new Date().toISOString(),
		},
		date: {
			type: "string", // YYYY-MM-DD - the day this event belongs to
			default: new Date().toISOString().split('T')[0],
		},
	}
} as const;


// Define interfaces
interface IJournal {
	title: string;
	intention: string;
	createdAt: string;
}

interface INote {
	journalId: string;
	content: string;
	createdAt: string;
	date: string;
}

interface IAction {
	journalId: string;
	content: string;
	createdAt: string;
	originalDate: string;
	date: string;
	status: "incomplete" | "complete" | "canceled";
}

interface IMood {
	journalId: string;
	content: string;
	createdAt: string;
	date: string;
	level: number; // 1-10
}

interface IEvent {
	journalId: string;
	content: string;
	createdAt: string;
	date: string;
}

// Cast the whole module to be schema-based with WithSchemas:
const { useCreatePersister: useCreatePersisterBase, useCreateStore: useCreateStoreBase, Provider, useTable, useAddRowCallback, useRowIds, useRow } = UiReact as UiReact.WithSchemas<
	[typeof storeSchema, NoValuesSchema]
>;

export type { INote, IAction, IMood, IEvent, IJournal };
export { Provider, useTable, useAddRowCallback, useRowIds, useRow };

export const useCreateStore = () => useCreateStoreBase(() => createStore().setTablesSchema(storeSchema))
export const useCreatePersister = (store: Store<[typeof storeSchema, NoValuesSchema]>) =>
	useCreatePersisterBase(
		store,
		(store) => createIndexedDbPersister(store, "journal"),
		[],
		async (persister) => {
			await persister.startAutoLoad();
			await persister.startAutoSave();
		},
	)