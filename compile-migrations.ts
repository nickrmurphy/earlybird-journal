// biome-ignore lint/style/useNodejsImportProtocol: <Using Bun>
import path from "path";
import { readMigrationFiles } from "drizzle-orm/migrator";

export async function compileMigrations(
	migrationsFolder: string,
	outputFolder: string,
) {
	// Convert relative paths to absolute paths based on the caller's location
	const absoluteMigrationsPath = path.resolve(process.cwd(), migrationsFolder);
	const absoluteOutputPath = path.resolve(process.cwd(), outputFolder);

	const migrations = readMigrationFiles({
		migrationsFolder: absoluteMigrationsPath,
	});
	await Bun.write(
		`${absoluteOutputPath}/migrations.json`,
		JSON.stringify(migrations),
	);
	console.log("Migrations compiled successfully!");
}

compileMigrations("src/db/migrations", "src/db/");
