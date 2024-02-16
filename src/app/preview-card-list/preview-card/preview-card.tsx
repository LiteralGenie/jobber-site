import { JobData } from "@/lib/job-data"
import { Button } from "@mui/material"
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
        <Button
            disabled={isActive}
            className={`flex flex-col p-4 h-full w-full border-2 text-start overflow-hidden ${
                isActive ? "" : "border-transparent"
            }`}
            onClick={onClick}
        >
            <span className={`${styles.ellipsed}`}>{data.title}</span>
            <span className={`${styles.ellipsed}`}>{data.company}</span>
            <span>{data.time_created}</span>
        </Button>
    )
}
