import { SearchFormData } from "@/app/search/types"
import { deserializeParams } from "@/app/search/useSearchForm"
import { db } from "@/database/db"
import { JobData } from "@/lib/job-data"
import { fromSqliteBool, toSqliteBool } from "@/lib/sql-utils"
import { sql } from "kysely"
import { NextRequest } from "next/server"

export interface GetJobsData {
    jobs: JobData[]
    prevPageCursor: number | null
    nextPageCursor: number | null
}

const PAGE_SIZE = 10

export async function getJobs(
    filters: Partial<SearchFormData<never>>
): Promise<GetJobsData> {
    let query = db
        .with("posts_ordered", (eb) => {
            let query = eb
                .selectFrom("indeed_posts as post")
                .selectAll()
                .select("rowid")

            return query
        })
        // Create column with skill array
        .with("with_skills", (eb) => {
            let query = eb
                .selectFrom("posts_ordered as post")
                .innerJoin("skills as sk", (join) => join.onTrue())
                .leftJoin("indeed_skill_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_skill", "=", "sk.id")
                )
                .groupBy("post.id")
                .select(
                    sql<string>`sk.id || ':' || sk.name || ':' || lbl.label`.as(
                        "skills"
                    )
                )
                .havingRef(
                    (eb) => eb.fn.countAll(),
                    "=",
                    (eb) => eb.fn.count("label")
                )
                .select([
                    "post.rowid",
                    "post.id",
                    "post.title",
                    "post.text",
                    "post.company",
                    "post.time_created",
                ])

            filters.skills?.include.forEach(({ id }) => {
                query = query.having(
                    sql`(lbl.id_skill, lbl.label)`,
                    "=",
                    sql`(${id}, 1)`
                )
            })

            filters.skills?.exclude.forEach(({ id }) => {
                query = query.having(
                    sql`(lbl.id_skill, lbl.label)`,
                    "=",
                    sql`(${id}, 0)`
                )
            })

            return query
        })
        // Create column with duty array
        .with("with_duties", (eb) => {
            let query = eb
                .selectFrom("with_skills as post")
                .innerJoin("duties as dt", (join) => join.onTrue())
                .leftJoin("indeed_duty_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_duty", "=", "dt.id")
                )
                .groupBy("post.id")
                .select(
                    sql<string>`dt.id || ':' || dt.name || ':' || lbl.label`.as(
                        "duties"
                    )
                )
                .havingRef(
                    (eb) => eb.fn.countAll(),
                    "=",
                    (eb) => eb.fn.count("label")
                )
                .selectAll("post")

            filters.duties?.include.forEach(({ id }) => {
                query = query.having(
                    sql`(lbl.id_duty, lbl.label)`,
                    "=",
                    sql`(${id}, 1)`
                )
            })

            filters.duties?.exclude.forEach(({ id }) => {
                query = query.having(
                    sql`(lbl.id_duty, lbl.label)`,
                    "=",
                    sql`(${id}, 0)`
                )
            })

            return query
        })
        // Include salary / clearance labels
        .with("with_misc", (eb) =>
            eb
                .selectFrom("with_duties as post")
                .innerJoin(
                    "indeed_misc_labels as lbl",
                    "lbl.id_post",
                    "post.id"
                )
                .selectAll("post")
                .select([
                    "lbl.is_hybrid",
                    "lbl.is_onsite",
                    "lbl.is_remote",
                    "lbl.salary",
                    "lbl.clearance",
                ])
        )
        .selectFrom("with_misc as post")
        .selectAll()

    if (filters.text) {
        query = query.where(
            sql`LOWER(post.title) || '\n\n' || LOWER(post.text)`,
            "regexp",
            filters.text.toLowerCase()
        )
    }

    if (filters.salary) {
        query = query.where("post.salary", ">=", filters.salary)
    }

    if (filters.clearance === "no" || filters.clearance === "yes") {
        const val = toSqliteBool(filters.clearance === "yes")
        query = query.where("post.clearance", "=", val)
    }

    const locFilters: Array<"is_hybrid" | "is_onsite" | "is_remote"> = []
    if (filters.locations?.hybrid) {
        locFilters.push("is_hybrid")
    }
    if (filters.locations?.onsite) {
        locFilters.push("is_onsite")
    }
    if (filters.locations?.remote) {
        locFilters.push("is_remote")
    }
    if (locFilters.length) {
        query = query.where((eb) =>
            eb.or(locFilters.map((loc) => eb(loc, "=", 1)))
        )
    }

    // Take the newest N+1 rows
    // where the +1 is the cursor for next page
    let queryAfter = query.orderBy("rowid", "desc").limit(PAGE_SIZE + 1)
    if (filters.after !== undefined) {
        queryAfter = queryAfter.where("rowid", "<=", filters.after)
    }

    const rowsAfter = await queryAfter.execute()

    const jobs = rowsAfter.slice(0, PAGE_SIZE).map(
        (d) =>
            ({
                id: d.id,

                clearance: fromSqliteBool(d.clearance),
                description: d.text,
                company: d.company,
                title: d.title,

                location_type: {
                    is_hybrid: fromSqliteBool(d.is_hybrid),
                    is_onsite: fromSqliteBool(d.is_onsite),
                    is_remote: fromSqliteBool(d.is_remote),
                },

                time_created: new Date(d.time_created * 1000).toISOString(),

                salary: {
                    min: d.salary,
                    max: null,
                },

                // Only show positive skill / duty labels
                skills: d.skills
                    .split(",")
                    .map((text) => text.split(":"))
                    .flatMap(([id, name, label]) => {
                        if (label === "0") {
                            return []
                        }

                        return [
                            {
                                id: parseInt(id),
                                name,
                            },
                        ]
                    }),
                duties: d.duties
                    .split(",")
                    .map((text) => text.split(":"))
                    .flatMap(([id, name, label]) => {
                        if (label === "0") {
                            return []
                        }

                        return [
                            {
                                id: parseInt(id),
                                name,
                            },
                        ]
                    }),
            } satisfies JobData)
    )

    let nextPageCursor: number | null = null
    if (rowsAfter[PAGE_SIZE]) {
        nextPageCursor = rowsAfter[PAGE_SIZE].rowid
    }

    let prevPageCursor: number | null = null
    if (filters.after) {
        const queryBefore = query
            .where("rowid", ">", filters.after)
            .orderBy("rowid", "asc")
            .limit(PAGE_SIZE)

        const rowsBefore = await queryBefore.execute()

        if (rowsBefore.length) {
            const idxLast = rowsBefore.length - 1
            prevPageCursor = rowsBefore[idxLast].rowid
        }
    }

    return { jobs, prevPageCursor, nextPageCursor }
}

export async function GET(request: NextRequest) {
    const filters = deserializeParams(request.nextUrl.searchParams)
    return Response.json(await getJobs(filters))
}
