"use client"

import { Faq } from "@/lib/components/faq/faq"
import { AppThemeProvider } from "@/lib/providers/app-theme-provider"
import { CssBaseline, StyledEngineProvider } from "@mui/material"

export default function Page() {
    return (
        <StyledEngineProvider injectFirst>
            <AppThemeProvider>
                <CssBaseline />
                <Faq />
            </AppThemeProvider>
        </StyledEngineProvider>
    )
}
