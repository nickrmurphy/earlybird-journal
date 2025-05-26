// export const getUsersQuery = () => db.select().from(users);

import { db } from "@/db/db";
import { journals } from "@/db/schema";
import { useLiveQuery } from "@electric-sql/pglite-react";

// export type User = Awaited<ReturnType<typeof getUsersQuery>['execute']>[number];

// const sql = getUsersQuery().toSQL();

const getJournalsQuery = () =>
	db.select().from(journals).orderBy(journals.createdAt);

type Journal = Awaited<ReturnType<typeof getJournalsQuery>["execute"]>;

export function useJournals() {
	const { sql, params } = getJournalsQuery().toSQL();
	return useLiveQuery<Journal>(sql, params);
}
