import { getSkills } from "./handler"

export async function GET() {
    return Response.json(await getSkills())
}
