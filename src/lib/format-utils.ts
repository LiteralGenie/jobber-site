import { JobData } from "./job-data"

export const MONTHS = [
    { short: "Jan", long: "January" },
    { short: "Feb", long: "February" },
    { short: "Mar", long: "March" },
    { short: "Apr", long: "April" },
    { short: "May", long: "May" },
    { short: "Jun", long: "June" },
    { short: "Jul", long: "July" },
    { short: "Aug", long: "August" },
    { short: "Sep", long: "September" },
    { short: "Oct", long: "October" },
    { short: "Nov", long: "November" },
    { short: "Dev", long: "December" },
]
export const STATE_ABBREVIATIONS = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
} as Record<string, string>

// https://stackoverflow.com/a/2901298
export function commafy(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const LOCATION_TYPE_NAMES = {
    is_hybrid: "Hybrid",
    is_onsite: "On-site",
    is_remote: "Remote",
} as const

export function humanizeLocationType(locationType: JobData["location_type"]) {
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

export function humanizeLocation(loc: JobData["locations"][number]): string {
    if (loc.city) {
        const stateAbbrv = STATE_ABBREVIATIONS[loc.state ?? ""] ?? loc.state
        return `${loc.city}, ${stateAbbrv}`
    } else if (loc.state) {
        return loc.state
    } else {
        return "???"
    }
}

export function humanizeDescription(description: JobData["description"]) {
    let result = description.trim()

    // Replace consecutive blank lines with single blank line
    result = result.replaceAll(/\s+\n\n/g, "\n\n")

    // Remove blank lines between indented lines (ie bullet points)
    result = result.replaceAll(/\n\n(?=(\s{4}|\t))/g, "\n")

    return result
}

export function humanizeSalary(salary: JobData["salary"]): string {
    return salary ? commafy(salary) : "???"
}

export function humanizeExperience(yoe: JobData["yoe"]): string {
    return yoe !== null ? `${yoe} years` : "???"
}

export function humanizeClearance(clearance: JobData["clearance"]): string {
    return clearance ? "Yes" : "No"
}
