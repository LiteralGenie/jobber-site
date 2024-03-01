import { db } from "@/database/db"
import { ONE_DAY } from "@/lib/constants"

export interface DutyDto {
    id: number
    name: string
    count: number
}
export async function getDuties() {
    const now = new Date().getTime()
    const start = (now - 14 * ONE_DAY) / 1000

    const data = await db
        .selectFrom("duties as dt")
        .leftJoin("duty_labels as lbl", "lbl.id_duty", "dt.id")
        .innerJoin("posts as p", "p.id", "lbl.id_post")

        .where("p.time_created", ">", start)

        .groupBy("dt.id")
        .select((eb) => eb.fn.sum<number>("lbl.label").as("count"))

        .select(["dt.id", "dt.name"])
        .execute()

    return data
}
