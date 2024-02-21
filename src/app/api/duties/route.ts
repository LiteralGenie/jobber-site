import { getDuties } from "./handler"

export async function GET() {
    return Response.json(await getDuties())
}
