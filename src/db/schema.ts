import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";

export const journals = sqliteTable("journals", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text("title").notNull().default("Unnamed Journal"),
	intention: text("intention").notNull().default("-"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedBy: text("updated_by").notNull(),
});

export const days = sqliteTable(
	"days",
	{
		id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
		journalId: text("journal_id")
			.notNull()
			.references(() => journals.id),
		title: text("title")
			.notNull()
			.default(sql`(strftime('%w', 'now', 'localtime') || ', ' || strftime('%Y %m %d', 'now', 'localtime'))`),
		date: text("date").notNull().default(sql`(date('now', 'localtime'))`),
		updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
		updatedBy: text("updated_by").notNull(),
	},
	(table) => ({
		uniqueJournalDate: unique().on(table.journalId, table.date),
	}),
);

export const notes = sqliteTable("notes", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	journalId: text("journal_id")
		.notNull()
		.references(() => journals.id),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	date: text("date").notNull().default(sql`(date('now', 'localtime'))`),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedBy: text("updated_by").notNull(),
});

// SQLite doesn't support enums natively, so we'll use text with a check constraint
export const actions = sqliteTable("actions", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	journalId: text("journal_id")
		.notNull()
		.references(() => journals.id),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	originalDate: text("original_date").notNull().default(sql`(date('now', 'localtime'))`),
	date: text("date").notNull().default(sql`(date('now', 'localtime'))`),
	status: text("status", { enum: ["incomplete", "complete", "canceled"] }).notNull().default("incomplete"),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedBy: text("updated_by").notNull(),
});

export const moods = sqliteTable("moods", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	journalId: text("journal_id")
		.notNull()
		.references(() => journals.id),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	date: text("date").notNull().default(sql`(date('now', 'localtime'))`),
	level: integer("level"),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedBy: text("updated_by").notNull(),
});

export const events = sqliteTable("events", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	journalId: text("journal_id")
		.notNull()
		.references(() => journals.id),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	date: text("date").notNull().default(sql`(date('now', 'localtime'))`),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedBy: text("updated_by").notNull(),
});

export const daysRelations = relations(days, ({ one }) => ({
	journal: one(journals, {
		fields: [days.journalId],
		references: [journals.id],
	}),
}));

export const notesRelations = relations(notes, ({ one }) => ({
	journal: one(journals, {
		fields: [notes.journalId],
		references: [journals.id],
	}),
}));

export const actionsRelations = relations(actions, ({ one }) => ({
	journal: one(journals, {
		fields: [actions.journalId],
		references: [journals.id],
	}),
}));

export const moodsRelations = relations(moods, ({ one }) => ({
	journal: one(journals, {
		fields: [moods.journalId],
		references: [journals.id],
	}),
}));

export const eventsRelations = relations(events, ({ one }) => ({
	journal: one(journals, {
		fields: [events.journalId],
		references: [journals.id],
	}),
}));

export type NewJournal = typeof journals.$inferInsert;
export type Journal = typeof journals.$inferSelect;
export type Day = typeof days.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type Action = typeof actions.$inferSelect;
export type Mood = typeof moods.$inferSelect;
export type Event = typeof events.$inferSelect;
