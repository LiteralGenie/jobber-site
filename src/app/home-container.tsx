"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import Home, { HomeProps } from "./home"

export function HomeContainer(props: HomeProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Home {...props} />
        </QueryClientProvider>
    )
}
