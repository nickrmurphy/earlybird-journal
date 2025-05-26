import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createMemo, createResource } from "solid-js";

const getJournalQuery = (journalId: string) =>
	db.select().from(journals).where(eq(journals.id, journalId));

export function useJournalById(journalId: string) {
	const [result] = createResource(journalId, async (id) => {
		try {
			const rows = await getJournalQuery(id).execute();
			return rows;
		} catch (error) {
			console.error("Failed to fetch journal:", error);
			throw error;
		}
	});

	return createMemo(() => {
		const rows = result();
		return {
			journal: rows && rows.length > 0 ? (rows[0] as Journal) : undefined,
			isLoading: result.state === "pending",
			error: result.error,
		};
	});
}
