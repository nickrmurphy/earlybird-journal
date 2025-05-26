import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { createResource } from "solid-js";
import { keysToCamelCase } from "@/utils/case";

const getJournalsQuery = () =>
	db.select().from(journals).orderBy(journals.createdAt);

export function useJournals() {
	const [results] = createResource(async () => {
		const rows = await getJournalsQuery().execute();
		return rows;
	});

	return () => {
		const rows = results();
		return {
			rows: rows
				? rows.map((row: Record<string, unknown>) => keysToCamelCase(row))
				: [],
			isLoading: results.state === "pending",
		};
	};
}
