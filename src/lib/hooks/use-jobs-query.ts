import { JobsDto } from "@/app/api/jobs/handler"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import { SEARCH_FILTER_SERIALIZER } from "../components/home/search/hooks/constants"
import { useSearchFilters } from "../components/home/search/hooks/useSearchFilters"
import { JobData } from "../job-data"
import { useHashContext } from "../providers/hash-provider"

async function queryJobs(queryString: string): Promise<JobsDto> {
    const resp = await fetch(`/api/jobs${queryString}`)
    const data = (await resp.json()) as JobsDto
    return data
}

export function useJobsQuery() {
    const { hash } = useHashContext()
    const { searchFilters } = useSearchFilters()

    const searchParams = useSearchParams()
    // @jank: Override nuqs state (query params) with window.location
    //        Basically, unless <Link> is used, url changes via back button aren't detected
    //        And the preview cards are using <a>s instead of <Link>s because
    //        the latter blocks on RSC stuff despite the href only pointing to a fragment (#job-id)
    const after = useMemo(() => {
        // Use window url if possible but fall back to useSearchParams during SSR
        // because we're doing a lot of client-side navigation that next doesnt support
        if (typeof window === "undefined") {
            const after = searchParams.get("after") ?? ""
            return parseInt(after)
        } else {
            const params = new URLSearchParams(window.location.search)
            const after = parseInt(params.get("after") ?? "")
            return after
        }
    }, [searchFilters, hash, searchParams])
    searchFilters.after = isNaN(after) ? null : after

    const queryString = SEARCH_FILTER_SERIALIZER(searchFilters)

    // Refetch on filter change
    const { data, isFetching } = useQuery({
        queryKey: [queryString],
        queryFn: () => queryJobs(queryString),
    })

    // Prefetch other pages
    const queryClient = useQueryClient()
    useEffect(() => {
        if (!data) {
            return
        }

        const cursors: number[] = []
        if (data.prevPageCursor) {
            cursors.push(data.prevPageCursor)
        }
        if (data.nextPageCursor) {
            cursors.push(data.nextPageCursor)
        }

        cursors.forEach((cursor) => {
            const filters = { ...searchFilters, after: cursor }
            const queryString = SEARCH_FILTER_SERIALIZER(filters)
            queryClient.prefetchQuery({
                queryKey: [queryString],
                queryFn: () => queryJobs(queryString),
            })
        })
    }, [data, queryClient, searchFilters])

    // Update selection on card click / filter change / pagination
    const hashedJob = useMemo<JobData | undefined>(() => {
        return data?.jobs.find((job) => job.id === parseInt(hash ?? ""))
    }, [data, hash])

    return {
        ...data,
        isFetching,
        jobs: data?.jobs ?? [],
        hashedJob: hashedJob,
    }
}
