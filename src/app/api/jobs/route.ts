import { SearchFormData } from "@/app/search/types"
import { deserializeParams } from "@/app/search/useSearchForm"
import { db } from "@/database/db"
import { JobData } from "@/lib/job-data"
import { fromSqliteBool, toSqliteBool } from "@/lib/sql-utils"
import { sql } from "kysely"
import { NextRequest } from "next/server"

export async function getJobs(filters: Partial<SearchFormData<never>>) {
    let query = db
        // Create column with skill array
        .with("with_skills", (eb) => {
            let query = eb
                .selectFrom("indeed_posts as post")
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
        .limit(100)

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

    const locations: Array<"hybrid" | "remote" | "onsite"> = []
    if (locations?.length) {
        const LOCATION_MAP = {
            hybrid: "is_hybrid",
            onsite: "is_onsite",
            remote: "is_remote",
        } as const

        query = query.where((eb) =>
            eb.or(locations.map((loc) => eb(LOCATION_MAP[loc], "=", "1")))
        )
    }

    console.log("jobs query\n\n", query.compile().sql)
    console.log("params\n\n", query.compile().parameters)
    const rows = await query.execute()

    const data = rows.map(
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

    return data
}

export async function GET(request: NextRequest) {
    const filters = deserializeParams(request.nextUrl.searchParams)
    return Response.json(await getJobs(filters))
}
