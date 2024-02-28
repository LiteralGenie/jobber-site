import { MONTHS, humanizeDescription, humanizeSalary } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import { CardContent, Divider, Typography } from "@mui/material"
import Locations from "./sections/locations"
import Requirements from "./sections/requirements"
import Responsibilities from "./sections/responsibilities"

export interface DetailsContentProps {
    job: JobData
}

export function DetailsContent({ job }: DetailsContentProps) {
    return (
        <article className="p-4">
            <header>
                {/* Basic info */}
                <Typography>{job.title}</Typography>
                <Typography>{job.company}</Typography>
                <Typography>{humanizeDate(job.time_created)}</Typography>

                <Divider className="my-4" />

                {/* Salary */}
                <div>
                    <span className="font-bold">Salary:</span>
                    <span>{" " + humanizeSalary(job.salary)}</span>
                </div>

                {/* Clearance */}
                <div>
                    <span className="font-bold">Clearance required:</span>
                    <span>{job.clearance ? " Yes" : " No"}</span>
                </div>

                {/* YoE */}
                <div>
                    <span className="font-bold">Minimum experience:</span>
                    <span>
                        {job.yoe !== null ? ` ${job.yoe} years` : " ???"}
                    </span>
                </div>

                <Divider className="my-4" />

                {/* Locations */}
                <Locations
                    locationType={job.location_type}
                    locations={job.locations}
                />

                {/* Skills */}
                {Object.keys(job.skills).length ? (
                    <div>
                        <Divider className="my-4" />
                        <Requirements skills={job.skills} />
                    </div>
                ) : (
                    ""
                )}

                {/* Responsibilities */}
                {job.duties.length ? (
                    <div>
                        <Divider className="my-4" />
                        <Responsibilities responsibilities={job.duties} />
                    </div>
                ) : (
                    ""
                )}
            </header>

            <Divider className="my-4" />

            {/* Description */}
            <span className="font-bold">Description:</span>
            <CardContent className="pt-2">
                <section className="whitespace-pre-wrap">
                    {humanizeDescription(job.description)}
                </section>
            </CardContent>
        </article>
    )
}

export function humanizeDate(date: string): string {
    const d = new Date(date)
    const month = MONTHS[d.getMonth()].long
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
