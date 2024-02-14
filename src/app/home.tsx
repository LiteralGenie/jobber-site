"use client"

import { JobData } from "@/lib/job-data"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Duty } from "./api/duties/route"
import { Skill } from "./api/skills/route"
import Details from "./details/details"
import styles from "./home.module.scss"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

export interface HomeProps {
    jobsInit: JobData[]
    duties: Duty[]
    skills: Skill[]
}

export default function Home({ jobsInit, duties, skills }: HomeProps) {
    const queryKey = useSearchParams().toString()

    const { data: jobs } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs?${queryKey}`)
            const update = (await resp.json()) as JobData[]
            return update
        },
        initialData: jobsInit,
    })
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <div className={styles["search-container"]}>
                    <Search duties={duties} skills={skills} />
                </div>

                <PreviewCardList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    jobs={jobs}
                />

                <div className={styles["details-container"]}>
                    <Details data={jobs[activeIndex]} />
                </div>
            </div>
        </div>
    )
}
