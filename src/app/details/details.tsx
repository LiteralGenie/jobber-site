import { JobData } from "@/lib/job-data"
import { Card, CardContent, Divider } from "@mui/material"
import Requirements from "./requirements"
import Responsibilities from "./responsibilities"

export interface DetailsProps {
    data: JobData
}

export default function Details({ data }: DetailsProps) {
    return (
        <article className="h-full overflow-auto">
            <Card variant="outlined" className="p-4">
                <header>
                    <p>{`Location: ${humanizeLocationType(
                        data.location_type
                    )}`}</p>
                    <p>{`Salary: ${humanizeSalary(data.salary)}`}</p>
                    <p>Clearance required: {data.clearance ? " Yes" : " No"}</p>

                    {Object.keys(data.skills).length ? (
                        <Requirements skills={data.skills} />
                    ) : (
                        ""
                    )}

                    {data.duties.length ? (
                        <Responsibilities responsibilities={data.duties} />
                    ) : (
                        ""
                    )}
                </header>

                <Divider className="mt-4 " />

                <CardContent>
                    <section className="whitespace-pre-wrap">
                        {humanizeDescription(data.description)}
                    </section>
                </CardContent>
            </Card>
        </article>
    )
}

const LOCATION_TYPE_NAMES = {
    is_hybrid: "Hybrid",
    is_onsite: "On-site",
    is_remote: "Remote",
} as const

function humanizeDescription(description: JobData["description"]) {
    let result = description.trim()

    // Replace consecutive blank lines with single blank line
    result = result.replaceAll(/\s+\n\n/g, "\n\n")

    // Remove blank lines between indented lines (ie bullet points)
    result = result.replaceAll(/\n\n(?=(\s{4}|\t))/g, "\n")

    return result
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

function humanizeSalary(salary: JobData["salary"]): string {
    if (!salary) {
        return "???"
    } else if (salary.max) {
        return `${salary.min} - ${salary.max}`
    } else {
        return `${salary.min}+`
    }
}
