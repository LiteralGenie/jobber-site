import { db } from "@/database/db"
import { JobData } from "@/lib/job-data"
import { sql } from "kysely"

export async function getJobs() {
    const raw_data = await db
        // Create column with skill array
        .with("with_skills", (eb) =>
            eb
                .selectFrom("indeed_posts as post")
                .innerJoin("skills as sk", (join) => join.onTrue())
                .leftJoin("indeed_skill_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_skill", "=", "sk.id"),
                )
                .groupBy("post.id")
                .select(sql<string>`sk.id || ':' || sk.name`.as("skills"))
                .havingRef(
                    (eb) => eb.fn.countAll(),
                    "=",
                    (eb) => eb.fn.count("label"),
                )
                .select([
                    "post.id",
                    "post.title",
                    "post.text",
                    "post.company",
                    "post.time_created",
                ]),
        )
        // Create column with duty array
        .with("with_duties", (eb) =>
            eb
                .selectFrom("with_skills as post")
                .innerJoin("duties as dt", (join) => join.onTrue())
                .leftJoin("indeed_duty_labels as lbl", (join) =>
                    join
                        .onRef("lbl.id_post", "=", "post.id")
                        .onRef("lbl.id_duty", "=", "dt.id"),
                )
                .groupBy("post.id")
                .select(sql<string>`dt.id || ':' || dt.name`.as("duties"))
                .havingRef(
                    (eb) => eb.fn.countAll(),
                    "=",
                    (eb) => eb.fn.count("label"),
                )
                .selectAll("post"),
        )
        // Include salary / clearance labels
        .with("with_misc", (eb) =>
            eb
                .selectFrom("with_duties as post")
                .innerJoin(
                    "indeed_misc_labels as lbl",
                    "lbl.id_post",
                    "post.id",
                )
                .selectAll("post")
                .select([
                    "lbl.is_hybrid",
                    "lbl.is_onsite",
                    "lbl.is_remote",
                    "lbl.salary",
                    "lbl.clearance",
                ]),
        )
        .selectFrom("with_misc as post")
        .selectAll()
        .limit(100)
        .execute()

    // Map skills to string arrays
    const data = raw_data.map(
        (d) =>
            ({
                id: d.id,
                clearance: d.clearance,
                description: d.text,
                company: d.company,
                title: d.title,

                location_type: {
                    is_hybrid: d.is_hybrid,
                    is_onsite: d.is_onsite,
                    is_remote: d.is_remote,
                },

                time_created: new Date(d.time_created * 1000).toISOString(),

                salary: {
                    min: d.salary,
                    max: null,
                },

                skills: d.skills
                    .split(",")
                    .map((text) => text.split(":"))
                    .map(([id, name]) => ({ id: parseInt(id), name })),
                duties: [],
            }) satisfies JobData,
    )

    return data
}

export async function GET() {
    return Response.json(await getJobs())
}
