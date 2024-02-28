import { humanizeLocation, humanizeLocationType } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"

export interface LocationsProps {
    locationType: JobData["location_type"]
    locations: JobData["locations"]
}

export default function Locations({ locationType, locations }: LocationsProps) {
    return (
        <div>
            <div>
                <span className="font-bold">Work location:</span>
                <span>{" " + humanizeLocationType(locationType)}</span>
            </div>

            {locations.length ? (
                <div>
                    <span className="mt-0 mb-1 font-bold">Locations:</span>
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
