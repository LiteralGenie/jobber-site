import { loadFromPageParams } from "@/app/search/hooks/useSearchForm"
import { NextRequest } from "next/server"
import { getJobs } from "./handler"

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const asObj = {
        after: params.get("after") ?? undefined,
        text: params.get("text") ?? undefined,
        salary: params.get("salary") ?? undefined,
        clearance: params.get("clearance") ?? undefined,
        "location-types": params.getAll("location-types") ?? undefined,
        "skills-included": params.getAll("skills-included") ?? undefined,
        "skills-excluded": params.getAll("skills-excluded") ?? undefined,
        "duties-included": params.getAll("duties-included") ?? undefined,
        "duties-excluded": params.getAll("duties-excluded") ?? undefined,
        cities: params.getAll("cities") ?? undefined,
        states: params.getAll("states") ?? undefined,
        "yoe-minimum": params.get("yoe-minimum") ?? undefined,
        "yoe-ignore-null": params.get("yoe-ignore-null") ?? undefined,
    }
    const filters = loadFromPageParams(asObj)

    return Response.json(await getJobs(filters))
}
