import { useJobsQuery } from "@/lib/hooks/use-jobs-query"
import { useActiveJob } from "@/lib/providers/active-job-provider"
import Details from "./details"
import { DetailsSkeleton } from "./details-skeleton"
import { EmptyDetails } from "./empty-details"

export function DetailsContainer() {
    const { isFetching } = useJobsQuery()
    const activeJob = useActiveJob()

    if (isFetching) {
        return <DetailsSkeleton />
    } else if (activeJob) {
        return <Details job={activeJob} />
    } else {
        return <EmptyDetails />
    }
}
