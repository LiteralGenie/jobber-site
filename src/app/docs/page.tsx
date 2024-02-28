"use client"

import { Docs } from "@/lib/components/docs/docs"
import { AppThemeProvider } from "@/lib/providers/app-theme-provider"
import { CssBaseline, StyledEngineProvider } from "@mui/material"
import "swagger-ui-react/swagger-ui.css"

export default function Page() {
    return (
        <StyledEngineProvider injectFirst>
            <AppThemeProvider>
                <CssBaseline />
                <Docs />
            </AppThemeProvider>
        </StyledEngineProvider>
    )
}
