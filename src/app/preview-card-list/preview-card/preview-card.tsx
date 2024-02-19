import { JobData } from "@/lib/job-data"
import { Button, Typography } from "@mui/material"
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
    return (
        <Button disabled={isActive} className={styles.button} onClick={onClick}>
            <Typography
                variant="body1"
                className={`${styles.text} ${styles.title}`}
                fontWeight="inherit"
                title={data.title}
            >
                {data.title}
            </Typography>
            <Typography
                variant="body2"
                className={styles.text}
                title={data.company}
            >
                {data.company}
            </Typography>
            <Typography
                variant="body2"
                className={styles.text}
                title={data.time_created}
            >
                {data.time_created}
            </Typography>
        </Button>
    )
}
