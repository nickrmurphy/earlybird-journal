import { useRow } from "@/stores/journal";

export const useJournalById = (journalId: string) => {
	return useRow("journals", journalId);
};

// export const getUsersQuery = () => db.select().from(users);

import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { eq } from "drizzle-orm";

const getJournalQuery = (journalId: string) =>
	db.select().from(journals).where(eq(journals.id, journalId));

type JournalQuery = ReturnType<typeof getJournalQuery>;
type JournalQueryResult = Awaited<ReturnType<JournalQuery["execute"]>>;
type Journal = JournalQueryResult[0];

export function useJournalByIdDb(journalId: string) {
	const { sql, params } = getJournalQuery(journalId).toSQL();

	const results = useLiveQuery<Journal>(sql, params);

	if (!results) {
		return {
			rows: [],
			isLoading: true,
		};
	}

	return {
		...results,
		isLoading: false,
	};
}
