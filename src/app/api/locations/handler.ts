import { db } from "@/database/db"
import { ONE_DAY } from "@/lib/constants"

// @jank: Backend data is kinda messy so manually curate the location filter options
//        (eg LLM won't respect requested order (country, state, city) or will use abbreviations (USA))
//        This won't affect the details pane, only dropdown options in search filters
const COUNTRY_WHITELIST = ["United States"]
// prettier-ignore
const STATE_WHITELIST = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", ]

export interface LocationDto {
    id: number
    country: string
    state: string
    city: string | null
    count: number
}

export async function getLocations(): Promise<LocationDto[]> {
    const now = new Date().getTime()
    const start = (now - 14 * ONE_DAY) / 1000

    // Return all possible locations
    // with number of (recent) posts associated with that location
    const data = await db
        .selectFrom("locations as loc")
        .leftJoin("location_labels as lbl", "lbl.id_location", "loc.id")

        .innerJoin("posts as p", "p.id", "lbl.id_post")
        .where("p.time_created", ">", start)

        .where("loc.country", "in", COUNTRY_WHITELIST)
        .where("loc.state", "in", STATE_WHITELIST)

        .groupBy("loc.id")
        .select((eb) => eb.fn.count<number>("loc.id").as("count"))

        .select(["loc.id", "loc.country", "loc.state", "loc.city"])
        .execute()

    return data
}
