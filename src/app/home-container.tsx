"use client"

import { AppThemeProvider } from "@/lib/providers/app-theme-provider"
import { FormProvider } from "@/lib/providers/form-provider"
import { HashProvider } from "@/lib/providers/hash-provider"
import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { DutyDto } from "./api/duties/handler"
import { JobsDto } from "./api/jobs/handler"
import { LocationDto } from "./api/locations/handler"
import { SkillDto } from "./api/skills/handler"
import Home from "./home"

export interface HomeContainerProps {
    jobs: JobsDto
    jobsQuery: string

    duties: DutyDto[]
    skills: SkillDto[]
    locations: LocationDto[]
}

export function HomeContainer({
    jobs,
    jobsQuery,
    duties,
    skills,
    locations,
}: HomeContainerProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        staleTime: Infinity,
                    },
                },
            })
    )

    // Load server-generated api data into query cache
    queryClient.setQueryData([jobsQuery], () => jobs)
    queryClient.setQueryData(["/api/duties"], () => duties)
    queryClient.setQueryData(["/api/skills"], () => skills)
    queryClient.setQueryData(["/api/locations"], () => locations)

    return (
        // DO NOT REMOVE THIS DIV!!!
        // There will be hydration errors unless CSSBaseline is inside a real tag
        // And these errors will only show up on production with useless stacktraces
        // And will only happen intermittently
        // And only if the data in the props is sufficiently large
        // ¯\_(ツ)_/¯
        //
        // The errors seem to be because the route (a child of <body>)
        // is sometimes rendered after its sibling <script> tags on the client but presumably not on the server
        // When the route is the first child of body, no errors
        //
        // @fixme: Revisit this when next@14.1.1 lands
        //         This only happens on next version 14.1.1-canary.46 and later
        <div className="h-full">
            <StyledEngineProvider injectFirst>
                <AppThemeProvider>
                    <CssBaseline />
                    <QueryClientProvider client={queryClient}>
                        <FormProvider>
                            <HashProvider>
                                <Home />
                            </HashProvider>
                        </FormProvider>
                    </QueryClientProvider>
                </AppThemeProvider>
            </StyledEngineProvider>
        </div>
    )
}
