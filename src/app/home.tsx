"use client"

import { JobData } from "@/lib/job-data"
import { useState } from "react"
import { Duty } from "./api/duties/route"
import { Skill } from "./api/skills/route"
import Details from "./details/details"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

export interface HomeProps {
    jobsInit: JobData[]
    duties: Duty[]
    skills: Skill[]
}

export default function Home({ jobsInit, duties, skills }: HomeProps) {
    const [jobs, setJobs] = useState(jobsInit)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex justify-center h-full">
            <div className="flex gap-16 p-8 w-full max-w-7xl">
                <Search duties={duties} skills={skills} />
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
