"use client"

import { useWindowSize } from "@/lib/hooks/useWindowSize"
import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useMemo, useRef } from "react"
import { DetailsContainer } from "./details/details-container"
import { MobileLayout } from "./mobile/mobile-layout"
import PreviewListContainer from "./preview-list/preview-list-container"
import Search from "./search/search"
import { TabletLayout } from "./tablet/tablet-layout"

export default function Home() {
    const { windowSize } = useWindowSize()

    const desktopContainerRef = useRef<HTMLDivElement | null>(null)
    const tabletContainerRef = useRef<HTMLDivElement | null>(null)
    const mobileContainerRef = useRef<HTMLDivElement | null>(null)

    // Flag to avoid rendering child components if container is hidden
    const screenType = useMemo(() => {
        if (
            !desktopContainerRef.current ||
            !tabletContainerRef.current ||
            !mobileContainerRef.current
        ) {
            return "desktop"
        }

        function isVisible(el: HTMLElement): boolean {
            const displayStyle = getComputedStyle(el).display
            return displayStyle !== "none"
        }

        if (isVisible(desktopContainerRef.current)) {
            return "desktop"
        } else if (isVisible(tabletContainerRef.current)) {
            return "tablet"
        } else {
            return "mobile"
        }
    }, [windowSize, desktopContainerRef])

    return (
        <div className="h-full">
            {/* Desktop layout */}
            <div
                ref={desktopContainerRef}
                className="hidden xl:grid p-12 h-full gap-16 justify-center grid-cols-[max-content_22rem_minmax(16rem,44rem)]"
            >
                {screenType === "desktop" && (
                    <ActiveJobProvider shouldDefault={true}>
                        <Search className="w-64" />
                        <PreviewListContainer />
                        <DetailsContainer />
                    </ActiveJobProvider>
                )}
            </div>

            {/* Tablet layout */}
            <div ref={tabletContainerRef} className="hidden md:block h-full">
                {screenType === "tablet" && <TabletLayout />}
            </div>

            {/* Phone portrait layout */}
            <div
                ref={mobileContainerRef}
                className="h-full overflow-auto md:hidden"
            >
                {screenType === "mobile" && <MobileLayout />}
            </div>
        </div>
    )
}
