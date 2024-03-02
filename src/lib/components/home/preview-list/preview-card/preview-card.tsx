import { MONTHS } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { Button, IconButton, Typography, alpha } from "@mui/material"
import { useMemo } from "react"
import styles from "./preview-card.module.scss"

export interface PreviewCardProps {
    job: JobData
    isActive: boolean
    isSeen: boolean
    onClick?: () => void
    onVisibilityToggle: () => void
}

export default function PreviewCard({
    job,
    isActive,
    isSeen,
    onClick,
    onVisibilityToggle,
}: PreviewCardProps) {
    const date = useMemo(() => humanizeDate(job.time_created), [job])

    return (
        <div
            className="w-full flex justify-between"
            style={{
                opacity: isSeen ? 0.5 : 1,
            }}
        >
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
            <div className="grid grid-rows-1 p-2">
                {/* <IconButton
                    className="h-min self-center"
                    href={job.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={`View on ${source}`}
                    title={`View on ${source}`}
                    onClick={(ev) => {
                        ev.stopPropagation()
                    }}
                >
                    <LaunchIcon />
                </IconButton> */}

                {isSeen ? (
                    <IconButton
                        className="self-center p-4"
                        aria-label="Mark as seen"
                        title="Mark as seen"
                        onClick={() => onVisibilityToggle()}
                    >
                        <VisibilityOffOutlinedIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        className="self-center p-4"
                        aria-label="Mark as not seen"
                        title="Mark as not seen"
                        onClick={() => onVisibilityToggle()}
                    >
                        <VisibilityIcon />
                    </IconButton>
                )}
            </div>
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
