import { db } from "@/database/db"

export interface Skill {
    id: number,
    name: string
}

export async function getSkills() {
    const data = await db
        .selectFrom("skills")
        .select([
            "id",
            "name"
        ]).execute()

    return data
}

export async function GET() {
    return Response.json(await getSkills())
}
