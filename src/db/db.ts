import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { drizzle } from "drizzle-orm/pglite";

let client: PGlite;
let db: ReturnType<typeof drizzle>;

export const initializeDatabase = async () => {
	if (!client) {
		client = await PGlite.create({
			extensions: { live },
			dataDir: "idb://journals",
		});
		db = drizzle({ client, casing: "snake_case" });
	}
	return { client, db };
};

export { client, db };
