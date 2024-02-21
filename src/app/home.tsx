"use client"

import { useHash } from "@/lib/hooks/useHash"
import { JobData } from "@/lib/job-data"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { DutyDto } from "./api/duties/route"
import { JobsDto } from "./api/jobs/route"
import { LocationDto } from "./api/locations/route"
import { SkillDto } from "./api/skills/route"
import Details from "./details/details"
import { EmptyDetails } from "./details/empty-details"
import styles from "./home.module.scss"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"
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

export interface HomeProps {
    jobsInit: JobsDto
    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
}

export default function Home({
    jobsInit,
    duties,
    skills,
    locations,
}: HomeProps) {
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
    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs?${queryKey}`)
            const update = (await resp.json()) as JobsDto
            return update
        },
        initialData: jobsInit,
    })

    // Update selection on card click / filter change / pagination
    const { hash } = useHash()
    const activeJob = useMemo<JobData | undefined>(() => {
        return data.jobs.find((job) => job.id === hash)
    }, [data, hash])

    // Set default selection on pagination / filter change
    const router = useRouter()
    useEffect(() => {
        if (!activeJob && hash === "") {
            const update = new URL(window.location.href)
            update.hash = data.jobs[0]?.id ?? ""
            router.replace(update.toString())
        }
    }, [activeJob, data, hash])

    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <Search duties={duties} skills={skills} locations={locations} />

                <PreviewCardList
                    jobs={data.jobs}
                    prevPageCursor={data.prevPageCursor}
                    nextPageCursor={data.nextPageCursor}
                />

                {activeJob ? <Details job={activeJob} /> : <EmptyDetails />}
            </div>
        </div>
    )
}
