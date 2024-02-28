import { sqlConn } from "@/database/db"
import Database from "better-sqlite3"
import { createReadStream, existsSync } from "fs"
import { mkdir, stat } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"
import { ReadableOptions } from "stream"

// Tables that should be included in export
const TABLE_WHITELIST = [
    "indeed_posts",
    "skills",
    "duties",
    "locations",
    "indeed_label_statuses",
    "indeed_skill_labels",
    "indeed_duty_labels",
    "indeed_misc_labels",
    "indeed_location_labels",
    "indeed_yoe_labels",
]

export async function GET() {
    const fpBackup = await backupDb()
    dropTables(fpBackup)

    const stats = await stat(fpBackup)
    const data = streamFile(fpBackup)
    const resp = new NextResponse(data, {
        status: 200,
        headers: new Headers({
            "content-disposition": "attachment; filename=db.sqlite",
            "content-type": "application/octet-stream",
            "content-length": stats.size + "",
        }),
    })

    return resp
}

async function backupDb() {
    // Create save location
    const cacheDir = join(__dirname, "cache")
    if (!existsSync(cacheDir)) {
        mkdir(cacheDir)
    }

    // Run backup
    const outFile = join(cacheDir, "db_backup.sqlite")
    await sqlConn.backup(outFile)

    // Return path to backup
    return outFile
}

async function dropTables(fpBackup: string) {
    const db = Database(fpBackup)

    // Get table names
    const tables = db
        .prepare(`SELECT name FROM sqlite_master WHERE type = 'table'`)
        .all() as Array<{ name: string }>

    // Drop tables not in whitelist
    for (let { name } of tables) {
        if (!TABLE_WHITELIST.includes(name)) {
            db.prepare("DROP TABLE ?").run(name)
        }
    }

    // Verify they were deleted
    const update = db
        .prepare(`SELECT name FROM sqlite_master WHERE type = 'table'`)
        .all() as Array<{ name: string }>

    const remaining = update.filter(
        ({ name }) => !TABLE_WHITELIST.includes(name)
    )

    if (remaining.length > 0) {
        throw Error(`Tables ${remaining.toString()} weren't deleted`)
    }

    if (update.length !== TABLE_WHITELIST.length) {
        throw Error(
            `Expected ${TABLE_WHITELIST.length} remaining tables but got ${
                remaining.length
            }: ${remaining.toString()}`
        )
    }
}

/**
 * From https://github.com/vercel/next.js/discussions/15453
 *
 * Return a stream from the disk
 * @param {string} path - The location of the file
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
function streamFile(
    path: string,
    options?: ReadableOptions
): ReadableStream<Uint8Array> {
    const downloadStream = createReadStream(path, options)

    return new ReadableStream({
        start(controller) {
            downloadStream.on("data", (chunk: Buffer) =>
                controller.enqueue(new Uint8Array(chunk))
            )
            downloadStream.on("end", () => controller.close())
            downloadStream.on("error", (error: NodeJS.ErrnoException) =>
                controller.error(error)
            )
        },
        cancel() {
            downloadStream.destroy()
        },
    })
}
