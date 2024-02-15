import { JobData } from "@/lib/job-data"
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
        <button
            disabled={isActive}
            className={`flex flex-col w-full p-4 h-full w-full border-2 text-start overflow-hidden ${
                isActive ? "" : "border-transparent"
            }`}
            onClick={onClick}
        >
            <h1 className={`${styles.ellipsed}`}>{data.title}</h1>
            <h2 className={`${styles.ellipsed}`}>{data.company}</h2>
            <h2>{data.time_created}</h2>
        </button>
    )
}
