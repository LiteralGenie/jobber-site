import { JobsDto } from "@/app/api/jobs/handler"
import { SEARCH_FILTER_SERIALIZER } from "@/app/search/hooks/constants"
import { useSearchFilters } from "@/app/search/hooks/useSearchFilters"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { JobData } from "../job-data"
import { useHash } from "./useHash"

type Options = UseQueryOptions<JobsDto, Error, JobsDto, string[]>

export function useJobsQuery(options?: Partial<Options>) {
    const { searchFilters } = useSearchFilters()

    const queryString = SEARCH_FILTER_SERIALIZER(searchFilters)

    // Refetch on filter change
    const { data, isFetching } = useQuery({
        queryKey: [queryString],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs${queryString}`)
            const update = (await resp.json()) as JobsDto
            return update
        },
        ...options,
    })

    // Update selection on card click / filter change / pagination
    const { hash } = useHash()
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
