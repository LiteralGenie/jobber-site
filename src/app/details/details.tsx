import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, Card, Paper } from "@mui/material"
import { useEffect, useRef } from "react"
import { useScrollTop } from "../../lib/hooks/useScrollTop"
import { CopyLinkButton } from "./copy-link-button"
import { DetailsContent } from "./details-content"

export interface DetailsProps {
    job: JobData
}

export default function Details({ job }: DetailsProps) {
    const scrollElRef = useRef<HTMLDivElement>(null)
    const { scrollTop } = useScrollTop(scrollElRef)

    const href = typeof window === "undefined" ? "" : window.location.href

    // Reset scroll position on content change
    useEffect(() => {
        scrollElRef.current?.scrollTo({ top: 0 })
    }, [job])

    return (
        <div className="overflow-hidden">
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
        </div>
    )
}
