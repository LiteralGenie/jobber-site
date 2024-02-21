import { MONTHS } from "@/lib/format-utils"
import { useHash } from "@/lib/hooks/useHash"
import { JobData } from "@/lib/job-data"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, IconButton, Typography, alpha } from "@mui/material"
import Link from "next/link"
import { useMemo } from "react"
import styles from "./preview-card.module.scss"
export interface PreviewCardProps {
    job: JobData
}

export default function PreviewCard({ job }: PreviewCardProps) {
    const date = useMemo(() => humanizeDate(job.time_created), [job])

    const { hash } = useHash()
    const isActive = useMemo(() => hash === job.id, [hash, job])

    return (
        <div className="w-full flex justify-between">
            {/* Overview */}
            <Button
                disabled={isActive}
                href={`#${job.id}`}
                // Back button breaks unless we notify nextjs of navigation
                component={Link}
                className={styles.button}
                sx={{
                    borderColor: isActive ? "info.main" : "transparent",
                    "&.MuiButton-root:hover": {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.info.main, 0.08),
                    },
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
                href={`https://www.indeed.com/viewjob?jk=${job.id}`}
                target="_blank"
                rel="noopener"
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
