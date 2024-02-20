"use client"

import { JobData } from "@/lib/job-data"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
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
    const queryKey = useQueryParams().get().toString()

    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs?${queryKey}`)
            const update = (await resp.json()) as JobsDto
            return update
        },
        initialData: jobsInit,
    })
    const [activeIndex, setActiveIndex] = useState(0)

    const activeJob = useMemo<JobData | undefined>(
        () => data.jobs[activeIndex],
        [data, activeIndex]
    )

    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <Search duties={duties} skills={skills} locations={locations} />

                <PreviewCardList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    jobs={data.jobs}
                    prevPageCursor={data.prevPageCursor}
                    nextPageCursor={data.nextPageCursor}
                />

                {activeJob ? <Details job={activeJob} /> : <EmptyDetails />}
            </div>
        </div>
    )
}
