import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { eq } from "drizzle-orm";
import { keysToCamelCase } from "@/utils/case";

const getJournalQuery = (journalId: string) =>
	db.select().from(journals).where(eq(journals.id, journalId));

type JournalQuery = ReturnType<typeof getJournalQuery>;
type JournalQueryResult = Awaited<ReturnType<JournalQuery["execute"]>>;
type Journal = JournalQueryResult[0];

export function useJournalById(journalId: string) {
	const { sql, params } = getJournalQuery(journalId).toSQL();

	const results = useLiveQuery<Journal>(sql, params);

	if (!results) {
		return {
			row: undefined,
			isLoading: true,
		};
	}

	return {
		...results,
		row: keysToCamelCase(results.rows[0]) as Journal,
		isLoading: false,
	};
}
