import { getDuties } from "./api/duties/handler"
import { getLocations } from "./api/locations/handler"
import { getSkills } from "./api/skills/handler"
import { HomeContainer } from "./home-container"

export const dynamic = "force-dynamic"

export default async function Page() {
    const duties = await getDuties()
    const skills = await getSkills()
    const locations = await getLocations()

    return (
        <HomeContainer duties={duties} skills={skills} locations={locations} />
    )
}
