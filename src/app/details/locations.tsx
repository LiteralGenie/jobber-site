import { STATE_ABBREVIATIONS } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"

const LOCATION_TYPE_NAMES = {
    is_hybrid: "Hybrid",
    is_onsite: "On-site",
    is_remote: "Remote",
} as const

export interface LocationsProps {
    locationType: JobData["location_type"]
    locations: JobData["locations"]
}

export default function Locations({ locationType, locations }: LocationsProps) {
    return (
        <div>
            <div>{`Work location: ${humanizeLocationType(locationType)}`}</div>

            {locations.length ? (
                <div>
                    <p className="mt-0 mb-1">Locations:</p>
                    <ul className="mt-0">
                        {locations.map((loc) => (
                            <li key={loc.id}>{humanizeLocation(loc)}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

function humanizeLocationType(locationType: JobData["location_type"]) {
    const types = Object.entries(locationType)
        .filter(([_, isAllowed]) => !!isAllowed)
        .map(
            ([type, _]) =>
                LOCATION_TYPE_NAMES[type as keyof JobData["location_type"]]
        )

    if (types.length) {
        return types.join(" | ")
    } else {
        return "???"
    }
}

function humanizeLocation(loc: JobData["locations"][number]): string {
    if (loc.city) {
        const stateAbbrv = STATE_ABBREVIATIONS[loc.state] || loc.state
        return `${loc.city}, ${stateAbbrv}`
    } else {
        return loc.state
    }
}
