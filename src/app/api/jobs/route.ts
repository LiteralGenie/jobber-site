import { deserializeParams } from "@/app/search/useSearchForm"
import { NextRequest } from "next/server"
import { getJobs } from "./handler"

export async function GET(request: NextRequest) {
    const filters = deserializeParams(request.nextUrl.searchParams)
    return Response.json(await getJobs(filters))
}
