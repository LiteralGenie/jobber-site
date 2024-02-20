import { MONTHS } from "@/lib/format-utils"
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
} from "@mui/material"
import { useRef, useState } from "react"
import styles from "./details.module.scss"
import Locations from "./locations"
import Requirements from "./requirements"
import Responsibilities from "./responsibilities"
import { useScrollTop } from "./useScrollTop"
export interface DetailsProps {
    job: JobData
}

export default function Details({ job: data }: DetailsProps) {
    const scrollElRef = useRef<HTMLDivElement>(null)
    const { scrollTop } = useScrollTop(scrollElRef)

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function handleLinkCopy() {
        // @fixme: use url fragment instead of updating cursor
        //         this is janky when navigating back and forth between pages
        const url = new URL(window.location.href)
        url.searchParams.set("after", data.rowid.toString())
        navigator.clipboard.writeText(url.href)

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
                        {data.title}
                    </Paper>
                </div>

                <article className="h-full p-4">
                    <header>
                        <div>{data.title}</div>
                        <div>{data.company}</div>
                        <div>{humanizeDate(data.time_created)}</div>

                        <Divider className="my-4" />

                        <div>{`Salary: ${humanizeSalary(data.salary)}`}</div>
                        <div>
                            Clearance required:{" "}
                            {data.clearance ? " Yes" : " No"}
                        </div>

                        <Divider className="my-4" />
                        <Locations
                            locationType={data.location_type}
                            locations={data.locations}
                        />

                        {Object.keys(data.skills).length ? (
                            <div>
                                <Divider className="my-4" />
                                <Requirements skills={data.skills} />
                            </div>
                        ) : (
                            ""
                        )}

                        {data.duties.length ? (
                            <div>
                                <Divider className="my-4" />
                                <Responsibilities
                                    responsibilities={data.duties}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </header>

                    <Divider className="mt-4" />

                    <CardContent>
                        <section className="whitespace-pre-wrap pb-8">
                            {humanizeDescription(data.description)}
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
                            href={`https://www.indeed.com/viewjob?jk=${data.id}`}
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
