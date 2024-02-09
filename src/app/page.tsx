import { getDuties } from "./api/duties/route"
import { getJobs } from "./api/jobs/route"
import { getSkills } from "./api/skills/route"
import Home from "./home"

export default async function HomeContainer() {
    // SSR the initial data in this container
    // because most everything else is a client component
    const jobs = await getJobs()
    const duties = await getDuties()
    const skills = await getSkills()

    return <Home jobsInit={jobs} duties={duties} skills={skills} />
}
