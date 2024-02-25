"use client"

import { FormProvider } from "@/lib/providers/form-provider"
import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { DutyDto } from "./api/duties/handler"
import { JobsDto } from "./api/jobs/handler"
import { LocationDto } from "./api/locations/handler"
import { SkillDto } from "./api/skills/handler"
import Home from "./home"

// const rootElement = document.getElementById("app")

const darkTheme = createTheme({
    // Angular Material palettes
    // https://github.com/angular/components/blob/350ab4d87eddc534cbae6ab7d2933fd773e7f965/src/material/core/theming/_palette.scss
    palette: {
        mode: "dark",
        primary: {
            // Pink
            50: "#fce4ec",
            100: "#f8bbd0",
            200: "#f48fb1",
            300: "#f06292",
            400: "#ec407a",
            500: "#e91e63",
            600: "#d81b60",
            700: "#c2185b",
            800: "#ad1457",
            900: "#880e4f",
            A100: "#ff80ab",
            A200: "#ff4081",
            A400: "#f50057",
            A700: "#c51162",
        },
        secondary: {
            // Blue-grey
            50: "#eceff1",
            100: "#cfd8dc",
            200: "#b0bec5",
            300: "#90a4ae",
            400: "#78909c",
            500: "#607d8b",
            600: "#546e7a",
            700: "#455a64",
            800: "#37474f",
            900: "#263238",
            A100: "#cfd8dc",
            A200: "#b0bec5",
            A400: "#78909c",
            A700: "#455a64",
        },
    },
    components: {
        // @fixme: Is this needed for tailwind interop?
        //         https://mui.com/material-ui/integrations/interoperability/#tailwind-css
        // MuiPopover: {
        //     defaultProps: {
        //         container: rootElement,
        //     },
        // },
        // MuiPopper: {
        //     defaultProps: {
        //         container: rootElement,
        //     },
        // },
        // MuiDialog: {
        //     defaultProps: {
        //         container: rootElement,
        //     },
        // },
        // MuiModal: {
        //     defaultProps: {
        //         container: rootElement,
        //     },
        // },
    },
})

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
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <QueryClientProvider client={queryClient}>
                        <FormProvider>
                            <Home />
                        </FormProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    )
}
