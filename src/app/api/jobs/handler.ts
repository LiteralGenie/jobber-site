import { db } from "@/database/db"
import { SearchFormData } from "@/lib/components/home/search/types"
import { PAGE_SIZE } from "@/lib/constants"
import { JobData } from "@/lib/job-data"
import { fromSqliteBool, toSqliteBool } from "@/lib/sql-utils"
import { sql } from "kysely"

export interface JobsDto {
    jobs: JobData[]
    prevPageCursor: number | null
    nextPageCursor: number | null
}

// Options not exposed as query params
export interface InternalOptions {
    limit: number
    startTime: number
}

export async function getJobs(
    opts: Partial<SearchFormData & InternalOptions>
): Promise<JobsDto> {
    const limit = opts.limit ?? PAGE_SIZE

    let query = db
        // Filter for fully-labeled posts
        .with("with_labels", (eb) => {
            let query = eb
                .selectFrom("posts as post")
                .innerJoin(
                    "label_statuses as status",
                    "status.id_post",
                    "post.id"
                )
                .where("status.has_skills", "=", 1)
                .where("status.has_duties", "=", 1)
                .where("status.has_locations", "=", 1)
                .where("status.has_misc", "=", 1)
                .where("status.has_yoe", "=", 1)
                .select([
                    "post.id",
                    "post.company",
                    "post.source",
                    "post.text",
                    "post.time_created",
                    "post.title",
                    "post.url",
                ])

            if (opts.startTime) {
                query = query.where("post.time_created", ">=", opts.startTime)
            }

            return query
        })
        // Skill array column
        .with("with_skills", (eb) => {
            let query = eb
                .selectFrom("with_labels as post")
                .innerJoin("skills as sk", (join) => join.onTrue())
                .leftJoin("skill_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_skill", "=", "sk.id")
                )
                .groupBy("post.id")
                .select(
                    sql<string>`GROUP_CONCAT(
                        sk.id || ':' || sk.name || ':' || lbl.label, 
                        ';'
                    )`.as("skills")
                )
                .selectAll("post")

            opts.skills?.include.forEach(({ id }) => {
                query = query.having(
                    sql`SUM(lbl.label) FILTER (WHERE lbl.id_skill = ${id})`,
                    "=",
                    1
                )
            })

            opts.skills?.exclude.forEach(({ id }) => {
                query = query.having(
                    sql`SUM(lbl.label) FILTER (WHERE lbl.id_skill = ${id})`,
                    "=",
                    0
                )
            })

            return query
        })
        // Duty array column
        .with("with_duties", (eb) => {
            let query = eb
                .selectFrom("with_skills as post")
                .innerJoin("duties as dt", (join) => join.onTrue())
                .leftJoin("duty_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_duty", "=", "dt.id")
                )
                .groupBy("post.id")
                .select(
                    sql<string>`GROUP_CONCAT(
                        dt.id || ':' || dt.name || ':' || lbl.label, 
                        ';'
                    )`.as("duties")
                )
                .selectAll("post")

            opts.duties?.include.forEach(({ id }) => {
                query = query.having(
                    sql`SUM(lbl.label) FILTER (WHERE lbl.id_duty = ${id})`,
                    "=",
                    1
                )
            })

            opts.duties?.exclude.forEach(({ id }) => {
                query = query.having(
                    sql`SUM(lbl.label) FILTER (WHERE lbl.id_duty = ${id})`,
                    "=",
                    0
                )
            })

            return query
        })
        // Location array column
        .with("with_locations", (eb) => {
            let query = eb
                .selectFrom("with_duties as post")
                .leftJoin("location_labels as lbl", "lbl.id_post", "post.id")
                .leftJoin("locations as loc", "loc.id", "lbl.id_location")
                .groupBy("post.id")
                .select(
                    sql<string>`GROUP_CONCAT(
                            loc.id || ':' || loc.country || ':' || loc.state || ':' || loc.city,
                            ';'
                        )`.as("locations")
                )
                .selectAll("post")

            const states = opts.locations?.states || []
            const cities = opts.locations?.cities || []
            if (states.length || cities.length) {
                query = query.where((eb) =>
                    eb.or([
                        ...cities.map((city) =>
                            eb("lbl.id_location", "=", city)
                        ),
                        ...states.map((state) => eb("loc.state", "=", state)),
                    ])
                )
            }

            return query
        })
        // Misc labels
        .with("with_misc", (eb) => {
            let query = eb
                .selectFrom("with_locations as post")
                .innerJoin("misc_labels as lbl", "lbl.id_post", "post.id")
                .selectAll("post")
                .select([
                    "lbl.is_hybrid",
                    "lbl.is_onsite",
                    "lbl.is_remote",
                    "lbl.salary",
                    "lbl.clearance",
                ])

            if (opts.salary) {
                query = query.where("lbl.salary", ">=", opts.salary)
            }

            if (typeof opts.clearance === "boolean") {
                const val = toSqliteBool(opts.clearance)
                query = query.where("lbl.clearance", "=", val)
            }

            const locTypeFilters: Array<
                "lbl.is_hybrid" | "lbl.is_onsite" | "lbl.is_remote"
            > = []
            if (opts.locationTypes?.hybrid) {
                locTypeFilters.push("lbl.is_hybrid")
            }
            if (opts.locationTypes?.onsite) {
                locTypeFilters.push("lbl.is_onsite")
            }
            if (opts.locationTypes?.remote) {
                locTypeFilters.push("lbl.is_remote")
            }
            if (locTypeFilters.length) {
                query = query.where((eb) =>
                    eb.or(locTypeFilters.map((loc) => eb(loc, "=", 1)))
                )
            }

            return query
        })
        // Years-of-experience column
        .with("with_yoe", (eb) => {
            let query = eb
                .selectFrom("with_misc as post")
                .leftJoin("yoe_labels as lbl", "lbl.id_post", "post.id")
                .selectAll("post")
                .select("lbl.yoe")

            const { minimum, ignoreNull } = opts.yoe ?? {}
            if (typeof minimum === "number" && minimum > 0) {
                query = query.where((eb) =>
                    eb(eb.fn.coalesce("lbl.yoe", sql<number>`0`), "<=", minimum)
                )
            }

            if (ignoreNull) {
                query = query.where("lbl.yoe", "is not", null)
            }

            return query
        })
        .selectFrom("with_yoe as post")
        .selectAll()

    if (opts.text) {
        let isRegexp = true
        try {
            new RegExp(opts.text)
        } catch {
            isRegexp = false
        }

        if (isRegexp) {
            query = query.where(
                sql`LOWER(post.title) || '\n\n' || LOWER(post.text)`,
                "regexp",
                opts.text.toLowerCase()
            )
        } else {
            query = query.where(
                sql`LOWER(post.title) || '\n\n' || LOWER(post.text)`,
                "=",
                `%${opts.text.toLowerCase()}%`
            )
        }
    }

    // Take the newest N+1 rows
    // where the +1 is the cursor for next page
    let queryAfter = query.orderBy("id", "desc").limit(limit + 1)
    if (typeof opts.after === "number") {
        queryAfter = queryAfter.where("id", "<=", opts.after)
    }
    // console.log("queryAfter", queryAfter.compile().sql)
    // console.log("vals", queryAfter.compile().parameters)

    const rowsAfter = await queryAfter.execute()

    const jobs = rowsAfter.slice(0, limit).map(
        (d) =>
            ({
                id: d.id,

                clearance: fromSqliteBool(d.clearance),
                company: d.company,
                description: d.text,
                salary: d.salary,
                source: d.source,
                title: d.title,
                url: d.url,
                yoe: d.yoe,

                location_type: {
                    is_hybrid: fromSqliteBool(d.is_hybrid),
                    is_onsite: fromSqliteBool(d.is_onsite),
                    is_remote: fromSqliteBool(d.is_remote),
                },

                time_created: new Date(d.time_created * 1000).toISOString(),

                // Only show positive skill / duty labels
                skills: d.skills
                    .split(";")
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
                    .split(";")
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
                locations:
                    d.locations === null
                        ? []
                        : d.locations
                              .split(";")
                              .map((text) => text.split(":"))
                              .flatMap(([id, country, state, city]) => ({
                                  id: parseInt(id),
                                  country,
                                  state,
                                  city,
                              })),
            } satisfies JobData)
    )

    let nextPageCursor: number | null = null
    if (rowsAfter[limit]) {
        nextPageCursor = rowsAfter[limit].id
    }

    let prevPageCursor: number | null = null
    if (opts.after) {
        const queryBefore = query
            .where("id", ">", opts.after)
            .orderBy("id", "asc")
            .limit(limit)

        const rowsBefore = await queryBefore.execute()

        if (rowsBefore.length) {
            const idxLast = rowsBefore.length - 1
            prevPageCursor = rowsBefore[idxLast].id
        }
    }

    return { jobs, prevPageCursor, nextPageCursor }
}
