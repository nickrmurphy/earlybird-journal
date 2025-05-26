// export const getUsersQuery = () => db.select().from(users);

import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { useLiveQuery } from "@electric-sql/pglite-react";

const getJournalsQuery = () =>
	db.select().from(journals).orderBy(journals.createdAt);

type x = ReturnType<typeof getJournalsQuery>;
type y = Awaited<ReturnType<x["execute"]>>;
type z = y[0];

export function useJournals() {
	const { sql, params } = getJournalsQuery().toSQL();

	const results = useLiveQuery<z>(sql, params);

	if (!results) {
		return {
			rows: [],
			isLoading: true,
		};
	}

	return {
		...results,
		isLoading: false,
	};
}
