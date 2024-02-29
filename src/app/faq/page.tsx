"use client"

import { FaqContainer } from "@/lib/components/faq/faq-container"
import { AppThemeProvider } from "@/lib/providers/app-theme-provider"
import { CssBaseline, StyledEngineProvider } from "@mui/material"

export default function Page() {
    return (
        <StyledEngineProvider injectFirst>
            <AppThemeProvider>
                <CssBaseline />
                <FaqContainer />
            </AppThemeProvider>
        </StyledEngineProvider>
    )
}
