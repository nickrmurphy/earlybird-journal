// export const getUsersQuery = () => db.select().from(users);

import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { keysToCamelCase } from "@/utils/case";

const getJournalsQuery = () =>
	db.select().from(journals).orderBy(journals.createdAt);

type JournalsQuery = ReturnType<typeof getJournalsQuery>;
type JournalsQueryResult = Awaited<ReturnType<JournalsQuery["execute"]>>;
type Journal = JournalsQueryResult[0];

export function useJournals() {
	const { sql, params } = getJournalsQuery().toSQL();

	const results = useLiveQuery<Journal>(sql, params);

	if (!results) {
		return {
			rows: [],
			isLoading: true,
		};
	}

	return {
		...results,
		rows: results.rows.map((row) => keysToCamelCase(row) as Journal),
		isLoading: false,
	};
}
