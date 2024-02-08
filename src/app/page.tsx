import { getJobs } from "./api/jobs/route"
import Home from "./home"

export default async function HomeContainer() {
    // SSR the initial data in this container
    // because most everything else is a client component
    const jobs = await getJobs()

    return <Home jobsInit={jobs} />
}
