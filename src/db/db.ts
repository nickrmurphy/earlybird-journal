import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";

let sqlocalDrizzle: SQLocalDrizzle;
let db: ReturnType<typeof drizzle>;

export const initializeDatabase = async () => {
	if (!sqlocalDrizzle) {
		sqlocalDrizzle = new SQLocalDrizzle("journals.sqlite3");
		const { driver, batchDriver } = sqlocalDrizzle;
		db = drizzle(driver, batchDriver);
	}
	return { client: sqlocalDrizzle, db };
};

export { sqlocalDrizzle as client, db };
