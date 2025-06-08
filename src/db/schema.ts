import type { Bullet } from "@/types";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { getClientId } from "./db.utils";

// Common columns for createdAt, updatedAt, updatedBy
const withTimestamps = {
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedBy: text("updated_by")
		.notNull()
		.$defaultFn(() => getClientId()),
};

export const journals = sqliteTable("journals", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text("title").notNull().default("Unnamed Journal"),
	intention: text("intention").notNull().default("-"),
	...withTimestamps,
});

type BaseMeta = {
	type: "task" | "mood";
};

type TaskMeta = BaseMeta & {
	type: "task";
	status: "incomplete" | "complete" | "canceled";
};

type MoodMeta = BaseMeta & {
	type: "mood";
	level: number; // 1-10 scale
};

export const journalEntries = sqliteTable("journal_entries", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	journalId: text()
		.notNull()
		.references(() => journals.id),
	content: text().notNull(),
	date: text().notNull().default(sql`(date('now', 'localtime'))`),
	type: text({ enum: ["note", "task", "mood", "event"] })
		.notNull()
		.$type<Bullet>(),
	meta: text({ mode: "json" }).$type<TaskMeta | MoodMeta | null>(),
	...withTimestamps,
});

export const journalEntriesRelations = relations(journalEntries, ({ one }) => ({
	journal: one(journals, {
		fields: [journalEntries.journalId],
		references: [journals.id],
	}),
}));

export type Journal = typeof journals.$inferSelect;
export type JournalEntry = typeof journalEntries.$inferSelect;

export type NewJournal = typeof journals.$inferInsert;
export type NewJournalEntry = typeof journalEntries.$inferInsert;

export type UpdateJournal = Omit<Partial<typeof journals.$inferInsert>, "id">;
export type UpdateJournalEntry = Omit<
	Partial<typeof journalEntries.$inferInsert>,
	"id"
>;
