import { JobsDto } from "@/app/api/jobs/handler"
import { SEARCH_FILTER_SERIALIZER } from "@/app/search/hooks/constants"
import { useSearchFilters } from "@/app/search/hooks/useSearchFilters"
import { UseSuspenseQueryOptions, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { JobData } from "../job-data"
import { useHash } from "./useHash"

type Options = UseSuspenseQueryOptions<JobsDto, Error, JobsDto, string[]>

export function useJobsQuery(options?: Partial<Options>) {
    const { searchFilters } = useSearchFilters()

    const queryString = SEARCH_FILTER_SERIALIZER(searchFilters)

    // Refetch on filter change
    const { data, isLoading } = useQuery({
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
    const activeJob = useMemo<JobData | undefined>(() => {
        return data?.jobs.find((job) => job.id === hash)
    }, [data, hash])

    // Set default selection on pagination / filter change
    const router = useRouter()
    useEffect(() => {
        if (!activeJob && hash === "") {
            const update = new URL(window.location.href)
            update.hash = data?.jobs[0]?.id ?? ""
            router.replace(update.toString())
        }
    }, [activeJob, data, hash, router])

    return { ...data, isLoading, activeJob }
}
