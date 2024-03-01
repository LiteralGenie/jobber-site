import { MONTHS, humanizeSource } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, IconButton, Typography, alpha } from "@mui/material"
import { useMemo } from "react"
import styles from "./preview-card.module.scss"

export interface PreviewCardProps {
    job: JobData
    isActive: boolean
    onClick?: () => void
}

export default function PreviewCard({
    job,
    isActive,
    onClick,
}: PreviewCardProps) {
    const date = useMemo(() => humanizeDate(job.time_created), [job])
    const source = useMemo(() => humanizeSource(job.source), [job])

    return (
        <div className="w-full flex justify-between">
            {/* Overview */}
            <Button
                onClick={onClick}
                disabled={isActive}
                href={`#${job.id}`}
                className={styles.button}
                sx={{
                    borderColor: isActive ? "info.main" : "transparent",
                    "&.MuiButton-root:hover": {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.info.main, 0.08),
                    },
                    color: "inherit",
                }}
            >
                <Typography
                    variant="body1"
                    className={`${styles.text} ${styles.title}`}
                    fontWeight="inherit"
                    title={job.title}
                    sx={{
                        color: isActive ? "info.main" : "",
                    }}
                >
                    {job.title}
                </Typography>
                <Typography
                    variant="body2"
                    className={styles.text}
                    sx={{
                        color: isActive ? "info.main" : "text.secondary",
                    }}
                    title={job.company}
                >
                    {job.company}
                </Typography>
                <Typography
                    variant="body2"
                    className={styles.text}
                    sx={{
                        color: isActive ? "info.main" : "text.secondary",
                    }}
                    title={date}
                >
                    {date}
                </Typography>
            </Button>

            {/* Link to original post */}
            <IconButton
                className="h-min self-center p-4"
                href={job.url}
                target="_blank"
                rel="noopener"
                aria-label={`View on ${source}`}
                title={`View on ${source}`}
                sx={{
                    pointerEvents: "initial",
                }}
                onClick={(ev) => {
                    ev.stopPropagation()
                }}
            >
                <LaunchIcon />
            </IconButton>
        </div>
    )
}

function humanizeDate(isoDate: string): string {
    const d = new Date(isoDate)
    const month = MONTHS[d.getMonth()].short
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
