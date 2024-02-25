import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import LinkIcon from "@mui/icons-material/Link"
import { Button, Card, Paper, Snackbar } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { DetailsContent } from "./details-content"
import styles from "./details.module.scss"
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
                className="overflow-y-auto h-full flex flex-col"
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

                <DetailsContent job={job} />
            </Card>

            <Paper elevation={1} className="w-full p-2 flex justify-between">
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
