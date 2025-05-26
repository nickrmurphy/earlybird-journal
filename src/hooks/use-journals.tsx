import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { createMemo, createResource } from "solid-js";

const getJournalsQuery = () =>
	db.select().from(journals).orderBy(journals.createdAt);

export function useJournals() {
	const [results] = createResource(async () => {
		try {
			const rows = await getJournalsQuery().execute();
			return rows;
		} catch (error) {
			console.error("Failed to fetch journals:", error);
			throw error;
		}
	});

	return createMemo(() => {
		const rows = results();
		return {
			journals: rows ? (rows as Journal[]) : [],
			isLoading: results.state === "pending",
			error: results.error,
		};
	});
}
