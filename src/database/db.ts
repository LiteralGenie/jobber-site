import * as SQLite from "better-sqlite3"
import { Kysely, SqliteDialect } from "kysely"
import { Database } from "./types"

const conn = new (SQLite as any)(process.env.DB_FILE)
conn.loadExtension("/usr/lib/sqlite3/pcre.so") // https://stackoverflow.com/a/8338515

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
