import * as SQLite from "better-sqlite3"
import { Kysely, SqliteDialect } from "kysely"
import { Database } from "./types"

const dialect = new SqliteDialect({
    database: new SQLite(process.env.DB_FILE),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
})
