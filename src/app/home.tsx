"use client"

import { useWindowSize } from "@/lib/hooks/useWindowSize"
import { useMemo, useRef } from "react"
import { DetailsContainer } from "./details/details-container"
import styles from "./home.module.scss"
import { MobilePreviewCardListContainer } from "./preview-card-list/mobile-preview-card-list-container"
import PreviewCardListContainer from "./preview-card-list/preview-card-list-container"
import SearchContainer from "./search/search-container"

export default function Home() {
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
                        <SearchContainer />
                        <PreviewCardListContainer />
                        <DetailsContainer />
                    </>
                )}
            </div>

            {/* Phone portrait layout */}
            <div className="min-h-0 h-full overflow-auto p-4 xl:hidden">
                {isMobile && <MobilePreviewCardListContainer />}
            </div>
        </div>
    )
}
