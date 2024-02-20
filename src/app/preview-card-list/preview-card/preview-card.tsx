import { MONTHS } from "@/lib/format-utils"
import { JobData } from "@/lib/job-data"
import { Button, Typography, alpha, useTheme } from "@mui/material"
import { useMemo } from "react"
import styles from "./preview-card.module.scss"

export interface PreviewCardProps {
    data: JobData
    onClick: () => void

    isActive: boolean
}

export default function PreviewCard({
    data,
    onClick,
    isActive,
}: PreviewCardProps) {
    const date = useMemo(() => humanizeDate(data.time_created), [data])
    const theme = useTheme()

    return (
        <Button
            disabled={isActive}
            className={styles.button}
            onClick={onClick}
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
                title={data.title}
                sx={{
                    color: isActive ? "info.main" : "",
                }}
            >
                {data.title}
            </Typography>
            <Typography
                variant="body2"
                className={styles.text}
                sx={{ color: isActive ? "info.main" : "text.secondary" }}
                title={data.company}
            >
                {data.company}
            </Typography>
            <Typography
                variant="body2"
                className={styles.text}
                sx={{ color: isActive ? "info.main" : "text.secondary" }}
                title={date}
            >
                {date}
            </Typography>
        </Button>
    )
}

function humanizeDate(isoDate: string): string {
    const d = new Date(isoDate)
    const month = MONTHS[d.getMonth()].short
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
