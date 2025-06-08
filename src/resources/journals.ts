import { db } from "@/db/db";
import { type NewJournal, journals } from "@/db/schema";
import { query, revalidate } from "@solidjs/router";
import { eq } from "drizzle-orm";

const CACHE_KEY = "journals";

export const getJournals = query(async () => {
	const rows = await db.select().from(journals).orderBy(journals.createdAt);
	return rows;
}, CACHE_KEY);

export const getJournal = query(async (id: string) => {
	const row = await db
		.select()
		.from(journals)
		.where(eq(journals.id, id))
		.limit(1);
	if (row.length === 0) {
		throw new Error(`Journal with id ${id} not found`);
	}
	return row[0];
}, CACHE_KEY);

export const createJournal = async (data: NewJournal) => {
	const [result] = await db.insert(journals).values(data).returning().execute();
	revalidate(getJournals.key);
	revalidate(getJournal.keyFor(result.id));
	return result;
};
