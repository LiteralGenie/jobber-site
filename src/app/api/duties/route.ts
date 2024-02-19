import { db } from "@/database/db"

export interface DutyDto {
    id: number
    name: string
}

export async function getDuties() {
    const data = await db.selectFrom("duties").select(["id", "name"]).execute()

    return data
}

export async function GET() {
    return Response.json(await getDuties())
}
