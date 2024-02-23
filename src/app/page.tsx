import { getDuties } from "./api/duties/handler"
import { getJobs } from "./api/jobs/handler"
import { getLocations } from "./api/locations/handler"
import { getSkills } from "./api/skills/handler"
import { HomeContainer } from "./home-container"
import { loadFromPageParams } from "./search/hooks/useSearchForm"
import { PageProps } from "./types"

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: PageProps) {
    const filters = loadFromPageParams(searchParams)
    const jobs = await getJobs(filters)

    const duties = await getDuties()
    const skills = await getSkills()
    const locations = await getLocations()

    return (
        <HomeContainer
            jobsInit={jobs}
            duties={duties}
            skills={skills}
            locations={locations}
        />
    )
}
