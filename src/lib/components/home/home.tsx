"use client"

import { useActiveLayout } from "@/lib/hooks/use-active-layout"
import { useWindowSize } from "@/lib/hooks/use-window-size"
import { ActiveJobProvider } from "@/lib/providers/active-job-provider"
import { useEffect, useRef } from "react"
import { TopBar } from "../app-bar/top-bar"
import { DetailsContainer } from "./details/details-container"
import { MobileLayout } from "./mobile/mobile-layout"
import PreviewListContainer from "./preview-list/preview-list-container"
import Search from "./search/search"
import { TabletLayout } from "./tablet/tablet-layout"

export default function Home() {
    const desktopContainerRef = useRef<HTMLDivElement | null>(null)
    const tabletContainerRef = useRef<HTMLDivElement | null>(null)
    const mobileContainerRef = useRef<HTMLDivElement | null>(null)

    // Choose which components to render based on screen size
    // (ie unmount components if a media query set the container to display: none)
    const { activeLayout, recheckLayout } = useActiveLayout({
        refs: [desktopContainerRef, tabletContainerRef, mobileContainerRef],
        defaultLayout: desktopContainerRef,
    })

    const { windowSize } = useWindowSize()
    useEffect(() => recheckLayout(), [windowSize])

    return (
        <div className="h-full">
            {/* Desktop layout */}
            <div ref={desktopContainerRef} className="hidden xl:block h-full">
                {activeLayout === desktopContainerRef && (
                    <ActiveJobProvider shouldDefault={true}>
                        <div className="h-full flex flex-col gap-8">
                            <TopBar />

                            <div className="p-8 pt-0 min-h-0 h-full grid gap-16 justify-center grid-cols-[max-content_22rem_minmax(16rem,44rem)]">
                                <Search className="w-64" />
                                <PreviewListContainer />
                                <DetailsContainer />
                            </div>
                        </div>
                    </ActiveJobProvider>
                )}
            </div>

            {/* Tablet layout */}
            <div ref={tabletContainerRef} className="hidden md:block h-full">
                {activeLayout === tabletContainerRef && <TabletLayout />}
            </div>

            {/* Phone layout */}
            <div
                ref={mobileContainerRef}
                className="h-full overflow-auto md:hidden"
            >
                {activeLayout === mobileContainerRef && <MobileLayout />}
            </div>
        </div>
    )
}
