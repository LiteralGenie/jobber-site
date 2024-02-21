import { db } from "@/database/db"

export interface SkillDto {
    id: number
    name: string
}

export async function getSkills() {
    const data = await db.selectFrom("skills").select(["id", "name"]).execute()

    return data
}
