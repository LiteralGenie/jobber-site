import { humanizeSource } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, Card, Paper } from "@mui/material"
import { useEffect, useRef } from "react"
import { CopyLinkButton } from "./copy-link-button"
import { DetailsContent } from "./details-content"

export interface DetailsProps {
    job: JobData
}

export default function Details({ job }: DetailsProps) {
    const scrollElRef = useRef<HTMLDivElement>(null)

    const href = typeof window === "undefined" ? "" : window.location.href

    const source = humanizeSource(job.source)

    // Reset scroll position on content change
    useEffect(() => {
        scrollElRef.current?.scrollTo({ top: 0 })
    }, [job])

    return (
        <div className="overflow-hidden flex flex-col">
            <Card
                ref={scrollElRef}
                variant="outlined"
                className="overflow-y-auto h-full"
            >
                <DetailsContent job={job} />
            </Card>

            <Paper elevation={1} className="w-full p-2 flex justify-between">
                <div className="flex gap-2">
                    <CopyLinkButton href={href} />
                </div>

                <div className="flex gap-2">
                    <Button
                        href={job.url}
                        target="_blank"
                        rel="noopener"
                        size="large"
                        color="primary"
                        variant="contained"
                        endIcon={<LaunchIcon />}
                        aria-label={`Apply on ${source}`}
                        title={`Apply on ${source}`}
                    >
                        {source}
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
