"use client"

import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import Home, { HomeProps } from "./home"

const rootElement = document.getElementById("app")
// const root = createRoot(rootElement as any)

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiDialog: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
    },
})

export function HomeContainer(props: HomeProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Home {...props} />
                </QueryClientProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
