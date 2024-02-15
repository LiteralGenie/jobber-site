"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Duty } from "./api/duties/route"
import { GetJobsData } from "./api/jobs/route"
import { Skill } from "./api/skills/route"
import Details from "./details/details"
import styles from "./home.module.scss"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"
import { useQueryParams } from "./useQueryParams"

export interface HomeProps {
    jobsInit: GetJobsData
    duties: Duty[]
    skills: Skill[]
}

export default function Home({ jobsInit, duties, skills }: HomeProps) {
    const queryParams = useQueryParams()

    const { data } = useQuery({
        queryKey: [queryParams.get().toString()],
        queryFn: async () => {
            const resp = await fetch(`/api/jobs?${queryParams.get()}`)
            const update = (await resp.json()) as GetJobsData
            return update
        },
        initialData: jobsInit,
    })
    const [activeIndex, setActiveIndex] = useState(0)

    function nextPage() {
        if (data.nextPageCursor === null) {
            return
        }

        const update = queryParams.get()
        update.set("after", data.nextPageCursor.toString())
        queryParams.set(update)
    }

    function prevPage() {
        if (data.prevPageCursor === null) {
            return
        }

        const update = queryParams.get()
        update.set("after", data.prevPageCursor.toString())
        queryParams.set(update)
    }

    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <div className={styles["search-container"]}>
                    <Search duties={duties} skills={skills} />
                </div>

                <PreviewCardList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    jobs={data.jobs}
                    onPrev={prevPage}
                    onNext={nextPage}
                />

                <div className={styles["details-container"]}>
                    <Details data={data.jobs[activeIndex]} />
                </div>
            </div>
        </div>
    )
}
