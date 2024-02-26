import { getDuties } from "./api/duties/handler"
import { getJobs } from "./api/jobs/handler"
import { getLocations } from "./api/locations/handler"
import { getSkills } from "./api/skills/handler"
import { HomeContainer } from "./home-container"
import { SEARCH_FILTER_SERIALIZER } from "./search/hooks/constants"
import {
    filtersToFormData,
    pageParamsToFilters,
} from "./search/hooks/useSearchForm"
import { PageProps } from "./types"

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: PageProps) {
    const duties = await getDuties()
    const skills = await getSkills()
    const locations = await getLocations()

    const filters = pageParamsToFilters(searchParams)
    const jobs = await getJobs(filtersToFormData(filters))
    const jobsQuery = SEARCH_FILTER_SERIALIZER(filters)

    return (
        <HomeContainer
            jobs={jobs}
            jobsQuery={jobsQuery}
            duties={duties}
            skills={skills}
            locations={locations}
        />
    )
}
