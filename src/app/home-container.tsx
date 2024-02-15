"use client"

import { CssBaseline, createTheme } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import Home, { HomeProps } from "./home"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

export function HomeContainer(props: HomeProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Home {...props} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}
