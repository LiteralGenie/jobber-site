import { MONTHS } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import { Card, CardContent, Divider, Paper } from "@mui/material"
import { useRef } from "react"
import styles from "./details.module.scss"
import Locations from "./locations"
import Requirements from "./requirements"
import Responsibilities from "./responsibilities"
import { useScrollTop } from "./useScrollTop"

export interface DetailsProps {
    data: JobData
}

export default function Details({ data }: DetailsProps) {
    const scrollElRef = useRef<HTMLDivElement>(null)
    const { scrollTop } = useScrollTop(scrollElRef)

    return (
        <div className="relative overflow-hidden">
            <Card
                ref={scrollElRef}
                variant="outlined"
                className="overflow-auto h-full"
            >
                <div
                    className={
                        scrollTop > 150
                            ? styles["header-visible"]
                            : styles["header-hidden"]
                    }
                >
                    <Paper elevation={6} className={styles["header-text"]}>
                        {data.title}
                    </Paper>
                </div>

                <article className="h-full p-4">
                    <header>
                        <div>{data.title}</div>
                        <div>{data.company}</div>
                        <div>{humanizeDate(data.time_created)}</div>

                        <Divider className="my-4 " />

                        <div>{`Salary: ${humanizeSalary(data.salary)}`}</div>
                        <div>
                            Clearance required:{" "}
                            {data.clearance ? " Yes" : " No"}
                        </div>

                        <Divider className="my-4 " />
                        <Locations
                            locationType={data.location_type}
                            locations={data.locations}
                        />

                        {Object.keys(data.skills).length ? (
                            <div>
                                <Divider className="my-4 " />
                                <Requirements skills={data.skills} />
                            </div>
                        ) : (
                            ""
                        )}

                        {data.duties.length ? (
                            <div>
                                <Divider className="my-4 " />
                                <Responsibilities
                                    responsibilities={data.duties}
                                />
                            </div>
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
                </article>
            </Card>
        </div>
    )
}

function humanizeDescription(description: JobData["description"]) {
    let result = description.trim()

    // Replace consecutive blank lines with single blank line
    result = result.replaceAll(/\s+\n\n/g, "\n\n")

    // Remove blank lines between indented lines (ie bullet points)
    result = result.replaceAll(/\n\n(?=(\s{4}|\t))/g, "\n")

    return result
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

function humanizeDate(isoDate: string): string {
    const d = new Date(isoDate)
    const month = MONTHS[d.getMonth()].long
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
