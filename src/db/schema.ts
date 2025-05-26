import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const journals = t.pgTable("journals", {
	id: t.uuid().primaryKey().defaultRandom(),
	title: t.text().notNull().default("Unnamed Journal"),
	intention: t.text().notNull().default("-"),
	createdAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedBy: t.text().notNull(),
});

export const days = t.pgTable(
	"days",
	{
		id: t.uuid().primaryKey().defaultRandom(),
		journalId: t
			.uuid()
			.notNull()
			.references(() => journals.id),
		title: t
			.text()
			.notNull()
			.default(sql`to_char(now(), 'FMDay, YYYY Month DD')`),
		date: t.date().notNull().defaultNow(),
		updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
		updatedBy: t.text().notNull(),
	},
	(table) => [t.unique().on(table.journalId, table.date).nullsNotDistinct()],
);

export const notes = t.pgTable("notes", {
	id: t.uuid().primaryKey().defaultRandom(),
	journalId: t
		.uuid()
		.notNull()
		.references(() => journals.id),
	content: t.text().notNull(),
	createdAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	date: t.date().notNull().defaultNow(),
	updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedBy: t.text().notNull(),
});

export const actionStatusEnum = t.pgEnum("action_status", [
	"incomplete",
	"complete",
	"canceled",
]);

export const actions = t.pgTable("actions", {
	id: t.uuid().primaryKey().defaultRandom(),
	journalId: t
		.uuid()
		.notNull()
		.references(() => journals.id),
	content: t.text().notNull(),
	createdAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	originalDate: t.date().notNull().defaultNow(),
	date: t.date().notNull().defaultNow(),
	status: actionStatusEnum().notNull().default("incomplete"),
	updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedBy: t.text().notNull(),
});

export const moods = t.pgTable("moods", {
	id: t.uuid().primaryKey().defaultRandom(),
	journalId: t
		.uuid()
		.notNull()
		.references(() => journals.id),
	content: t.text().notNull(),
	createdAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	date: t.date().notNull().defaultNow(),
	level: t.integer(),
	updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedBy: t.text().notNull(),
});

export const events = t.pgTable("events", {
	id: t.uuid().primaryKey().defaultRandom(),
	journalId: t
		.uuid()
		.notNull()
		.references(() => journals.id),
	content: t.text().notNull(),
	createdAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	date: t.date().notNull().defaultNow(),
	updatedAt: t.timestamp({ withTimezone: false }).notNull().defaultNow(),
	updatedBy: t.text().notNull(),
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
