import { db } from "@/database/db"
import { JobData } from "@/lib/job-data"
import { sql } from "kysely"

export async function GET() {
    const raw_data = await db
        // Create column with concat'd skills
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
                .select(sql<string>`sk.id || ':' || sk.name`.as('skills'))
                .havingRef(
                    (eb) => eb.fn.countAll(),
                    "=",
                    (eb) => eb.fn.count("label"),
                )
                .select([
                    "post.id",
                    "post.title",
                    "post.text as description",
                    "post.company",
                    "post.time_created",
                ]),
        )
        // Include salary / clearance labels
        .with("with_misc", (eb) =>
            eb
                .selectFrom("with_skills as post")
                .innerJoin(
                    "indeed_misc_labels as lbl",
                    "lbl.id_post",
                    "post.id",
                )
                .selectAll("post")
                .select(["lbl.salary", "lbl.clearance"]),
        )
        .selectFrom("with_misc as post")
        .selectAll()
        .limit(100)
        .execute()

    // Map skills to string arrays
    const data = raw_data.map(
        (d) =>
            ({
                ...d,
                location: "remote" as const,
                time_created: new Date(d.time_created * 1000).toISOString(),
                salary: {
                    min: d.salary,
                    max: 999999,
                },
                skills: d.skills.split(",").map((text) => text.split(":")).map(([id, name]) => ({ id: parseInt(id), name })),
            }) satisfies JobData,
    )

    return Response.json(data)
}
