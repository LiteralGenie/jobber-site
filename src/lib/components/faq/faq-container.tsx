import { useActiveLayout } from "@/lib/hooks/use-active-layout"
import { useWindowSize } from "@/lib/hooks/use-window-size"
import { useEffect, useRef } from "react"
import { TopBar } from "../top-bar/top-bar"
import { TopBarWithDrawer } from "../top-bar/top-bar-with-drawer"
import { Faq } from "./faq"

export function FaqContainer() {
    const desktopContainerRef = useRef<HTMLDivElement | null>(null)
    const mobileContainerRef = useRef<HTMLDivElement | null>(null)

    // Choose which components to render based on screen size
    // (ie unmount components if a media query set the container to display: none)
    const { activeLayout, recheckLayout } = useActiveLayout({
        refs: [desktopContainerRef, mobileContainerRef],
        defaultLayout: desktopContainerRef,
    })

    const { windowSize } = useWindowSize()
    useEffect(() => recheckLayout(), [windowSize])

    return (
        <div className="h-full overflow-auto flex flex-col">
            {/* Desktop header */}
            <div ref={desktopContainerRef} className="hidden md:block">
                {activeLayout === desktopContainerRef && <TopBar />}
            </div>

            {/* Phone header */}
            <div ref={mobileContainerRef} className="md:hidden">
                {activeLayout === mobileContainerRef && <TopBarWithDrawer />}
            </div>

            <Faq />
        </div>
    )
}
