import { PGlite } from "@electric-sql/pglite"
import { live } from "@electric-sql/pglite/live"
import { drizzle } from "drizzle-orm/pglite";

export const client = await PGlite.create({
    extensions: { live },
    dataDir: 'idb://journals',
})

export const db = drizzle({ client, casing: "snake_case" });
