import { useAppTheme } from "@/lib/providers/app-theme-provider"
import SwaggerUI from "swagger-ui-react"
import { DarkTheme } from "../home/theme/themes"
import { TopBar } from "../home/top-bar/top-bar"

export function Docs() {
    const { theme } = useAppTheme()

    return (
        <div className="h-full overflow-auto">
            {theme === DarkTheme && (
                <link rel="stylesheet" href="/SwaggerDark.css" />
            )}

            <TopBar />

            <SwaggerUI url="/swagger.yaml" />
        </div>
    )
}
