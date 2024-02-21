import { getLocations } from "./handler"

export async function GET() {
    return Response.json(await getLocations())
}
