import { useActiveLayout } from "@/lib/hooks/use-active-layout"
import { useWindowSize } from "@/lib/hooks/use-window-size"
import { useAppTheme } from "@/lib/providers/app-theme-provider"
import { useEffect, useRef } from "react"
import SwaggerUI from "swagger-ui-react"
import { TopBar } from "../app-bar/top-bar"
import { TopBarWithDrawer } from "../app-bar/top-bar-with-drawer"
import { DarkTheme } from "../home/theme/themes"

export function Docs() {
    const { theme } = useAppTheme()

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
            {theme === DarkTheme && (
                <link rel="stylesheet" href="/SwaggerDark.css" />
            )}

            {/* Desktop header */}
            <div ref={desktopContainerRef} className="hidden md:block">
                {activeLayout === desktopContainerRef && <TopBar />}
            </div>

            {/* Phone header */}
            <div ref={mobileContainerRef} className="md:hidden">
                {activeLayout === mobileContainerRef && <TopBarWithDrawer />}
            </div>

            <div>
                <SwaggerUI url="/swagger.yaml" />
            </div>
        </div>
    )
}
