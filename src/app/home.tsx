"use client"

import { JobData } from "@/lib/job-data"
import { useState } from "react"
import Details from "./details/details"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

export interface HomeProps {
    jobsInit: JobData[]
}

export default function Home({ jobsInit }: HomeProps) {
    const [jobs, setJobs] = useState(jobsInit)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex justify-center h-full">
            <div className="flex gap-16 p-8 w-full max-w-7xl">
                <Search />
                <PreviewCardList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    jobs={jobs}
                />
                <div className="grow flex flex-col items-center">
                    <Details data={jobs[activeIndex]} />
                </div>
            </div>
        </div>
    )
}
