import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import Details from "./details"
import { DetailsSkeleton } from "./details-skeleton"
import { EmptyDetails } from "./empty-details"

export function DetailsContainer() {
    const { activeJob, isFetching } = useJobsQuery()

    if (isFetching) {
        return <DetailsSkeleton />
    } else if (activeJob) {
        return <Details job={activeJob} />
    } else {
        return <EmptyDetails />
    }
}
