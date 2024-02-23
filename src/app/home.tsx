"use client"

import { DutyDto } from "./api/duties/handler"
import { LocationDto } from "./api/locations/handler"
import { SkillDto } from "./api/skills/handler"
import { DetailsContainer } from "./details/details-container"
import styles from "./home.module.scss"
import PreviewCardList from "./preview-card-list/preview-card-list"
import Search from "./search/search"

export interface HomeProps {
    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
}

export default function Home({ duties, skills, locations }: HomeProps) {
    return (
        <div className="flex justify-center h-full">
            <div className={styles["container"]}>
                <Search duties={duties} skills={skills} locations={locations} />

                <PreviewCardList />

                <DetailsContainer />
            </div>
        </div>
    )
}
