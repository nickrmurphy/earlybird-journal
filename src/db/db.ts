import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
// In-memory Postgres
const client = new PGlite();
export const db = drizzle({ client });