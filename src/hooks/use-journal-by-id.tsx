import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { createResource } from "solid-js";
import { eq } from "drizzle-orm";
import { keysToCamelCase } from "@/utils/case";

const getJournalQuery = (journalId: string) =>
	db.select().from(journals).where(eq(journals.id, journalId));

export function useJournalById(journalId: string) {
	const [result] = createResource(journalId, async (id) => {
		const rows = await getJournalQuery(id).execute();
		return rows;
	});

	return () => {
		const rows = result();
		return {
			row: rows && rows.length > 0 ? keysToCamelCase(rows[0]) : undefined,
			isLoading: result.state === "pending",
		};
	};
}
