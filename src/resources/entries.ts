import { db } from "@/db/db"
import { actions, moods, notes, events } from "@/db/schema"
import type { Bullet, Entry } from "@/types";
import { query, revalidate } from "@solidjs/router";
import { eq } from "drizzle-orm";

const CACHE_KEY = 'entries';

export const getEntries = query(async (journalId: string) => {
    const [notesRows, moodsRows, actionsRows, eventsRows] = await Promise.all([
        db.select().from(notes).where(eq(notes.journalId, journalId)),
        db.select().from(moods).where(eq(moods.journalId, journalId)),
        db.select().from(actions).where(eq(actions.journalId, journalId)),
        db.select().from(events).where(eq(events.journalId, journalId)),
    ]);

    const entries: (Entry & {
        createdAt: Date;
    })[] = [
            ...notesRows.map((n) => ({ ...n, type: "note" as Bullet })),
            ...moodsRows.map((m) => ({ ...m, type: "feeling" as Bullet })),
            ...actionsRows.map((a) => ({ ...a, type: "task" as Bullet })),
            ...eventsRows.map((e) => ({ ...e, type: "event" as Bullet })),
        ];

    entries.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
    return entries;
}, CACHE_KEY);

export const createEntry = async (type: Bullet, data: {
    content: string;
    journalId: string;
}) => {
    let result: Entry;

    switch (type) {
        case "note":
            result = { ...(await db.insert(notes).values(data).returning().execute())[0], type: "note" };
            break;
        case "feeling":
            result = { ...(await db.insert(moods).values(data).returning().execute())[0], type: "feeling" };
            break;
        case "task":
            result = { ...(await db.insert(actions).values(data).returning().execute())[0], type: "task" };
            break;
        case "event":
            result = { ...(await db.insert(events).values(data).returning().execute())[0], type: "event" };
            break;
    }

    revalidate(getEntries.key);
    return result;
}

export const updateEntry = async (type: Bullet, id: string, data: {
    content?: string;
}) => {
    let result: Entry;

    switch (type) {
        case "note":
            result = { ...(await db.update(notes).set(data).where(eq(notes.id, id)).returning().execute())[0], type: "note" };
            break;
        case "feeling":
            result = { ...(await db.update(moods).set(data).where(eq(moods.id, id)).returning().execute())[0], type: "feeling" };
            break;
        case "task":
            result = { ...(await db.update(actions).set(data).where(eq(actions.id, id)).returning().execute())[0], type: "task" };
            break;
        case "event":
            result = { ...(await db.update(events).set(data).where(eq(events.id, id)).returning().execute())[0], type: "event" };
            break;
    }

    revalidate(getEntries.key);
    return result;
}