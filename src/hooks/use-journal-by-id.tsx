import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createResource } from "solid-js";

export function useJournalById(journalId: string) {
	const [result] = createResource(journalId, async (id) => {
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
	};
}
