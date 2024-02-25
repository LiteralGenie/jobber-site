import { PAGE_SIZE } from "@/lib/constants"
import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import { Divider, Typography } from "@mui/material"
import PreviewCard from "./preview-card/preview-card"
import PreviewCardSkeleton from "./preview-card/preview-card-skeleton"

export default function PreviewCardList() {
    const { jobs, isFetching, activeJob } = useJobsQuery()

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
                {jobs.map((item, idx) => (
                    <div key={item.id} className="rounded-md">
                        <PreviewCard
                            job={item}
                            isActive={item.id === activeJob?.id}
                        />

                        {idx == jobs.length - 1 ? "" : <Divider />}
                    </div>
                ))}
            </>
        )
    }
}
