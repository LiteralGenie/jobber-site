import { SearchFormData } from "@/app/search/types"
import { deserializeParams } from "@/app/search/useSearchForm"
import { db } from "@/database/db"
import { sql } from "kysely"
import { NextRequest } from "next/server"

export async function getJobSearch(data: Partial<SearchFormData>) {
    let query = db.selectFrom("indeed_posts as post").selectAll("post")

    // Filter text
    if (data.text) {
        query = query.where(
            sql`post.title || '\n\n' || post.text`,
            sql`REGEXP`,
            data.text as string
        )
    }

    // Filter duties
    const dutiesIncluded = data.duties?.include.map(({ id }) => id) as number[]
    const dutiesExcluded = data.duties?.exclude.map(({ id }) => id) as number[]
    if (dutiesIncluded?.length || dutiesExcluded?.length) {
        let withDuties = query
            .innerJoin("duties as dt", (join) => join.onTrue())
            .leftJoin("indeed_duty_labels as lbl", (join) =>
                join
                    .onRef("lbl.id_post", "=", "post.id")
                    .onRef("lbl.id_duty", "=", "dt.id")
            )

        if (dutiesIncluded?.length) {
            withDuties = withDuties.where("lbl.id_duty", "in", dutiesIncluded)
        }

        if (dutiesExcluded?.length) {
            withDuties = withDuties.where(
                "lbl.id_duty",
                "not in",
                dutiesExcluded
            )
        }

        query = withDuties.groupBy("post.id").selectAll("post")
    }

    return query.limit(10).execute()
}

export async function GET(request: NextRequest) {
    const data = deserializeParams(request.nextUrl.searchParams)
    return Response.json(await getJobSearch(data))
}
