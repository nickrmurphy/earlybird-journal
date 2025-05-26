import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createResource } from "solid-js";

/**
 * Creates a reactive resource for fetching a journal by ID
 * @param journalId - The ID of the journal to fetch
 * @returns Resource with journal data, loading state, and error handling
 */
export function createJournalByIdResource(journalId: string) {
	const [result, { refetch }] = createResource(journalId, async (id) => {
		try {
			const rows = await db
				.select()
				.from(journals)
				.where(eq(journals.id, id))
				.execute();
			return rows[0] as Journal | undefined;
		} catch (error) {
			console.error("Failed to fetch journal:", error);
			throw error;
		}
	});

	return {
		get journal() {
			return result();
		},
		get isLoading() {
			return result.state === "pending";
		},
		get error() {
			return result.error;
		},
		refetch,
	};
}
