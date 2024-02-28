import { PAGE_SIZE } from "@/lib/constants"
import { useJobsQuery } from "@/lib/hooks/use-jobs-query"
import { useActiveJob } from "@/lib/providers/active-job-provider"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import { Divider, Typography } from "@mui/material"
import PreviewCard, { PreviewCardProps } from "./preview-card/preview-card"
import PreviewCardSkeleton from "./preview-card/preview-card-skeleton"

export interface PreviewListProps {
    onClick?: PreviewCardProps["onClick"]
}

export default function PreviewList({ onClick }: PreviewListProps) {
    const { jobs, isFetching } = useJobsQuery()

    const activeJob = useActiveJob()

    if (isFetching) {
        // Loading
        return [...Array(PAGE_SIZE)].map((_, idx) => (
            <div key={idx}>
                <PreviewCardSkeleton />
                <Divider />
            </div>
        ))
    } else if (jobs.length === 0) {
        // Zero results
        return (
            <div className="h-full flex flex-col justify-center items-center gap-2">
                <SentimentDissatisfiedIcon
                    sx={{ fontSize: 50, color: "text.disabled" }}
                    className=""
                />
                <Typography fontSize={20} sx={{ color: "text.disabled" }}>
                    No matches
                </Typography>
            </div>
        )
    } else {
        // Card list
        return (
            <>
                {jobs.map((job, idx) => (
                    <div key={job.id} className="rounded-md">
                        <PreviewCard
                            job={job}
                            isActive={job.id === activeJob?.id}
                            onClick={onClick}
                        />

                        {idx == jobs.length - 1 ? "" : <Divider />}
                    </div>
                ))}
            </>
        )
    }
}
