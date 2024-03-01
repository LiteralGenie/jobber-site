import { db } from "@/database/db"
import { ONE_DAY } from "@/lib/constants"

export interface SkillDto {
    id: number
    name: string
    count: number
}

export async function getSkills() {
    const now = new Date().getTime()
    const start = (now - 14 * ONE_DAY) / 1000

    // Return all possible skills
    // with number of (recent) posts associated with that skill
    const data = await db
        .selectFrom("skills as sk")
        .leftJoin("skill_labels as lbl", "lbl.id_skill", "sk.id")
        .innerJoin("posts as p", "p.id", "lbl.id_post")

        .where("p.time_created", ">", start)

        .groupBy("sk.id")
        .select((eb) => eb.fn.sum<number>("lbl.label").as("count"))

        .select(["sk.id", "sk.name"])
        .execute()

    return data
}
