import { JobsDto } from "@/app/api/jobs/handler"
import { SEARCH_FILTER_SERIALIZER } from "@/app/search/hooks/constants"
import { useSearchFilters } from "@/app/search/hooks/useSearchFilters"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { JobData } from "../job-data"
import { useHash } from "./useHash"

export function useJobsQuery() {
    const { hash } = useHash()
    const { searchFilters } = useSearchFilters()

    // @jank: Override nuqs state (query params) with window.location
    //        Basically, unless <Link> is used, url changes via back button aren't detected
    //        And the preview cards are using <a>s instead of <Link>s because
    //        the latter blocks on RSC stuff despite the href only pointing to a fragment (#job-id)
    const after = useMemo(() => {
        const params = new URLSearchParams(window.location.search)
        const after = parseInt(params.get("after") ?? "")
        return after
    }, [searchFilters, hash])
    searchFilters.after = isNaN(after) ? null : after

    const queryString = SEARCH_FILTER_SERIALIZER(searchFilters)

    // Refetch on filter change
    const { data, isFetching } = useQuery({
        queryKey: [queryString],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs${queryString}`)
            const update = (await resp.json()) as JobsDto
            return update
        },
    })

    // Update selection on card click / filter change / pagination
    // const { hash } = useHash()
    const hashedJob = useMemo<JobData | undefined>(() => {
        return data?.jobs.find((job) => job.id === hash)
    }, [data, hash])

    return {
        ...data,
        isFetching,
        jobs: data?.jobs ?? [],
        activeJob: hashedJob ?? data?.jobs[0],
    }
}
