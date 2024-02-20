import { MONTHS, commafy } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import LinkIcon from "@mui/icons-material/Link"
import {
    Button,
    Card,
    CardContent,
    Divider,
    Paper,
    Snackbar,
    Typography,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import styles from "./details.module.scss"
import Locations from "./locations"
import Requirements from "./requirements"
import Responsibilities from "./responsibilities"
import { useScrollTop } from "./useScrollTop"

export interface DetailsProps {
    job: JobData
}

export default function Details({ job }: DetailsProps) {
    const scrollElRef = useRef<HTMLDivElement>(null)
    const { scrollTop } = useScrollTop(scrollElRef)

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    // Reset scroll position on content change
    useEffect(() => {
        scrollElRef.current?.scrollTo({ top: 0 })
    }, [job])

    function handleLinkCopy() {
        navigator.clipboard.writeText(window.location.href)
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return
        }

        setSnackbarOpen(false)
    }

    return (
        <div className="relative overflow-hidden flex flex-col">
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
                        {job.title}
                    </Paper>
                </div>

                <article className="h-full p-4">
                    <header>
                        {/* Basic info */}
                        <Typography>{job.title}</Typography>
                        <Typography>{job.company}</Typography>
                        <Typography>
                            {humanizeDate(job.time_created)}
                        </Typography>

                        <Divider className="my-4" />

                        {/* Salary */}
                        <div>
                            <span className="font-bold">Salary:</span>
                            <span>{" " + humanizeSalary(job.salary)}</span>
                        </div>

                        {/* Clearance */}
                        <div>
                            <span className="font-bold">
                                Clearance required:
                            </span>
                            <span>{job.clearance ? " Yes" : " No"}</span>
                        </div>

                        <Divider className="my-4" />

                        {/* Locations */}
                        <Locations
                            locationType={job.location_type}
                            locations={job.locations}
                        />
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
                                <Responsibilities
                                    responsibilities={job.duties}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </header>

                    <Divider className="mt-4 mb-4" />

                    {/* Description */}
                    <span className="font-bold">Description:</span>
                    <CardContent className="pt-2">
                        <section className="whitespace-pre-wrap pb-8">
                            {humanizeDescription(job.description)}
                        </section>
                    </CardContent>
                </article>

                <Paper
                    elevation={1}
                    className="absolute bottom-0 w-full p-2 flex justify-between"
                >
                    <div className="flex gap-2">
                        <Button
                            size="large"
                            color="primary"
                            variant="outlined"
                            aria-label="Copy link"
                            title="Copy link"
                            onClick={handleLinkCopy}
                        >
                            <LinkIcon />
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            href={`https://www.indeed.com/viewjob?jk=${job.id}`}
                            target="_blank"
                            rel="noopener"
                            size="large"
                            color="primary"
                            variant="contained"
                            endIcon={<LaunchIcon />}
                            aria-label="Apply on Indeed"
                            title="Apply on Indeed"
                        >
                            Indeed
                        </Button>
                    </div>
                </Paper>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                message="Copied link to clipboard"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
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
        return `${commafy(salary.min)} - ${commafy(salary.max)}`
    } else {
        return `${commafy(salary.min)}`
    }
}

function humanizeDate(isoDate: string): string {
    const d = new Date(isoDate)
    const month = MONTHS[d.getMonth()].long
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
