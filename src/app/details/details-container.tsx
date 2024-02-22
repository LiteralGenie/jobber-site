import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import Details from "./details"
import { EmptyDetails } from "./empty-details"

export function DetailsContainer() {
    const { activeJob } = useJobsQuery()

    return activeJob ? <Details job={activeJob} /> : <EmptyDetails />
}
