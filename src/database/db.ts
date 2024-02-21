import * as SQLite from "better-sqlite3"
import { Kysely, SqliteDialect } from "kysely"
import { Database } from "./types"

const fp =
    process.env.NODE_ENV === "production"
        ? "/app/src/data/db.sqlite"
        : process.env.DB_FILE
const conn = new (SQLite as any)(fp)

// Load regex extension
conn.loadExtension(
    process.env.NODE_ENV === "production"
        ? "/usr/lib/sqlite3/pcre"
        : process.env.PCRE_FILE
)

const dialect = new SqliteDialect({
    database: conn,
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
})
