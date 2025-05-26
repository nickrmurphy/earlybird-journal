import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { createResource } from "solid-js";

/**
 * Creates a reactive resource for fetching all journals
 * @returns Resource with journals data, loading state, and error handling
 */
export function createJournalsResource() {
	const [results, { refetch }] = createResource(async () => {
		try {
			const rows = await db
				.select()
				.from(journals)
				.orderBy(journals.createdAt)
				.execute();
			return rows as Journal[];
		} catch (error) {
			console.error("Failed to fetch journals:", error);
			throw error;
		}
	});

	return {
		get journals() {
			return results() || [];
		},
		get isLoading() {
			return results.state === "pending";
		},
		get error() {
			return results.error;
		},
		refetch,
	};
}
