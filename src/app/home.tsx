"use client"

import { useWindowSize } from "@/lib/hooks/useWindowSize"
import { Paper } from "@mui/material"
import { useMemo, useRef } from "react"
import { DutyDto } from "./api/duties/handler"
import { LocationDto } from "./api/locations/handler"
import { SkillDto } from "./api/skills/handler"
import { DetailsContainer } from "./details/details-container"
import styles from "./home.module.scss"
import { MobilePreviewCardListContainer } from "./preview-card-list/mobile-preview-card-list-container"
import PreviewCardListContainer from "./preview-card-list/preview-card-list-container"
import SearchContainer from "./search/search-container"

export interface HomeProps {
    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
}

export default function Home({ duties, skills, locations }: HomeProps) {
    const { windowSize } = useWindowSize()

    const desktopContainerRef = useRef<HTMLDivElement | null>(null)

    // Flag to avoid rendering child components if container is hidden
    const isMobile = useMemo(() => {
        if (!desktopContainerRef.current) {
            return false
        }

        const displayStyle = getComputedStyle(
            desktopContainerRef.current
        ).display

        return displayStyle === "none"
    }, [windowSize, desktopContainerRef])

    return (
        <div className="h-full">
            {/* Desktop layout */}
            <div ref={desktopContainerRef} className={styles["container"]}>
                {!isMobile && (
                    <>
                        <SearchContainer
                            duties={duties}
                            skills={skills}
                            locations={locations}
                        />
                        <PreviewCardListContainer />
                        <DetailsContainer />
                    </>
                )}
            </div>

            {/* Phone portrait layout */}
            <div className="min-h-0 h-full overflow-auto p-4">
                {isMobile && (
                    <Paper
                        variant="outlined"
                        className="min-h-0 h-full overflow-auto flex flex-col"
                    >
                        <MobilePreviewCardListContainer
                            duties={duties}
                            skills={skills}
                            locations={locations}
                        />
                    </Paper>
                )}
            </div>
        </div>
    )
}
