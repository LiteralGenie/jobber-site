import { db } from "@/database/db"

// @hack: Backend data is kinda messy so manually curate the location filter options
//        (eg LLM won't respect requested order (country, state, city) or will use abbreviations (USA))
//        This won't affect the details pane, only dropdown options in search filters
const COUNTRY_WHITELIST = ["United States"]
// prettier-ignore
const STATE_WHITELIST = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", ]

export interface LocationDto {
    country: string
    state: string
    city: string | null
    count: number
}

export async function getLocations(): Promise<LocationDto[]> {
    const data = await db
        .selectFrom("locations as loc")
        .leftJoin("indeed_location_labels as lbl", "lbl.id_location", "loc.id")
        .where("country", "in", COUNTRY_WHITELIST)
        .where("state", "in", STATE_WHITELIST)
        .groupBy("loc.id")
        .select(["loc.id", "loc.country", "loc.state", "loc.city"])
        .select((eb) => eb.fn.count<number>("loc.id").as("count"))
        .execute()

    return data
}

export async function GET() {
    return Response.json(await getLocations())
}
