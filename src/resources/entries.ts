import { db } from "@/db/db"
import { journalEntries, type UpdateJournalEntry } from "@/db/schema"
import type { Bullet } from "@/types";
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

export const createEntry = async (type: Bullet, data: {
    content: string;
    journalId: string;
}) => {
    const [result] = await db.insert(journalEntries).values({
        ...data,
        type,
        meta: null, // TODO: handle meta for task/mood if needed
    }).returning().execute();
    revalidate(getEntries.key);
    return { id: result.id, type, content: result.content };
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
