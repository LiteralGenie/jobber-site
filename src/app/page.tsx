import { getDuties } from "./api/duties/route"
import { getJobs } from "./api/jobs/route"
import { getSkills } from "./api/skills/route"
import { HomeContainer } from "./home-container"
import { deserializeParams } from "./search/useSearchForm"
import { PageProps } from "./types"

export default async function Page({ searchParams }: PageProps) {
    const filters = deserializeParams(pageParamsToUrlParams(searchParams))
    const jobs = await getJobs(filters)

    const duties = await getDuties()
    const skills = await getSkills()

    return <HomeContainer jobsInit={jobs} duties={duties} skills={skills} />
}

function pageParamsToUrlParams(
    original: PageProps["searchParams"]
): URLSearchParams {
    const params = new URLSearchParams()
    Object.entries(original).forEach(([k, v]) => {
        if (v === undefined) {
            return
        } else if (Array.isArray(v)) {
            v.forEach((x) => params.append(k, x))
        } else {
            params.append(k, v)
        }
    })

    return params
}
