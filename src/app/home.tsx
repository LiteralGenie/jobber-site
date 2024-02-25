"use client"

import { useWindowSize } from "@/lib/hooks/useWindowSize"
import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useMemo, useRef } from "react"
import { DetailsContainer } from "./details/details-container"
import styles from "./home.module.scss"
import { MobilePreviewCardListContainer } from "./preview-card-list/mobile-preview-card-list-container"
import PreviewCardListContainer from "./preview-card-list/preview-card-list-container"
import Search from "./search/search"

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
                    <ActiveJobProvider shouldDefault={true}>
                        <Search className="w-64" />
                        <PreviewCardListContainer />
                        <DetailsContainer />
                    </ActiveJobProvider>
                )}
            </div>

            {/* Phone portrait layout */}
            <div className="min-h-0 h-full overflow-auto xl:hidden">
                {isMobile && (
                    <ActiveJobProvider shouldDefault={false}>
                        <MobilePreviewCardListContainer />
                    </ActiveJobProvider>
                )}
            </div>
        </div>
    )
}
