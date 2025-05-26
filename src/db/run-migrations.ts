import type { MigrationConfig } from "drizzle-orm/migrator";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";

export const runMigrations = async (
	db: BaseSQLiteDatabase<'async', unknown>,
	migrations: object,
) => {
	// dialect and session will appear to not exist...but they do
	// @ts-ignore
	await db.dialect.migrate(migrations, db.session, {
		migrationsTable: "drizzle_migrations",
	} satisfies Omit<MigrationConfig, "migrationsFolder">);
};
