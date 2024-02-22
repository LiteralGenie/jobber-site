import { JobsDto } from "@/app/api/jobs/handler"
import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { JobData } from "../job-data"
import { useHash } from "./useHash"
import { useQueryParams } from "./useQueryParams"

const PARAM_WHITELIST = [
    "after",
    "text",
    "salary",
    "location-types",
    "skills-included",
    "skills-excluded",
    "duties-included",
    "duties-excluded",
    "cities",
    "states",
    "yoe-minimum",
    "yoe-ignore-null",
]

type Options = UseSuspenseQueryOptions<JobsDto, Error, JobsDto, string[]>

export function useJobsQuery(options?: Partial<Options>) {
    const queryParams = useQueryParams()
    const queryKey = useMemo(() => {
        const params = queryParams.get()

        // Only watch query params that affect search results
        Array.from(params.keys())
            .filter((k) => !PARAM_WHITELIST.includes(k))
            .forEach((k) => params.delete(k))

        params.sort()

        return params.toString()
    }, [queryParams])

    // Refetch on filter change
    const { data } = useSuspenseQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs?${queryKey}`)
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

    return { ...data, activeJob, queryKey }
}
