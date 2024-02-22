"use client"

import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { DutyDto } from "./api/duties/handler"
import { JobsDto } from "./api/jobs/handler"
import { LocationDto } from "./api/locations/handler"
import { SkillDto } from "./api/skills/handler"
import Details from "./details/details"
import { EmptyDetails } from "./details/empty-details"
import styles from "./home.module.scss"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

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
    const { activeJob, jobs, prevPageCursor, nextPageCursor } = useJobsQuery({
        initialData: jobsInit,
    })

    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <Search duties={duties} skills={skills} locations={locations} />

                <PreviewCardList
                    jobs={jobs}
                    prevPageCursor={prevPageCursor}
                    nextPageCursor={nextPageCursor}
                />

                {activeJob ? <Details job={activeJob} /> : <EmptyDetails />}
            </div>
        </div>
    )
}
