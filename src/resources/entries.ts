import { db } from "@/db/db"
import { journalEntries, type NewJournalEntry, type UpdateJournalEntry } from "@/db/schema"
import { query, revalidate } from "@solidjs/router";
import { eq } from "drizzle-orm";

const CACHE_KEY = 'entries';

export const getEntries = query(async (journalId: string) =>
    db
        .select()
        .from(journalEntries)
        .where(eq(journalEntries.journalId, journalId))
        .orderBy(journalEntries.createdAt)
    , CACHE_KEY);

export const createEntry = async (data: NewJournalEntry) => {
    const [result] = await db.insert(journalEntries).values(data).returning().execute();
    revalidate(getEntries.key);
    return result;
}

export const updateEntry = async (id: string, data: UpdateJournalEntry) => {
    const [result] = await db.update(journalEntries)
        .set(data)
        .where(eq(journalEntries.id, id))
        .returning()
        .execute();
    revalidate(getEntries.key);
    return result;
}
