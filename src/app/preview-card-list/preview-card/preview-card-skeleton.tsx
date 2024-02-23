import { Skeleton, Typography } from "@mui/material"
import styles from "./preview-card.module.scss"

export default function PreviewCardSkeleton() {
    return (
        <div className="p-4 text-start flex flex-col gap-2">
            <Typography
                variant="body1"
                className={`${styles.text} ${styles.title}`}
                fontWeight="inherit"
            >
                <Skeleton variant="rectangular" className="w-full" />
            </Typography>
            <Typography variant="body2" className={styles.text}>
                <Skeleton variant="rectangular" className="w-2/3" />
            </Typography>
            <Typography variant="body2" className={styles.text}>
                <Skeleton variant="rectangular" className="w-1/3" />
            </Typography>
        </div>
    )
}
