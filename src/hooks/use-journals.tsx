import { db } from "@/db/db";
import { type Journal, journals } from "@/db/schema";
import { createResource } from "solid-js";

export function useJournals() {
	const [results] = createResource(async () => {
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
	};
}
