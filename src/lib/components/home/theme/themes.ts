// const rootElement = document.getElementById("app")

import { createTheme } from "@mui/material"

export const DarkTheme = createTheme({
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

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            // Indigo
            50: "#e8eaf6",
            100: "#c5cae9",
            200: "#9fa8da",
            300: "#7986cb",
            400: "#5c6bc0",
            500: "#3f51b5",
            600: "#3949ab",
            700: "#303f9f",
            800: "#283593",
            900: "#1a237e",
            A100: "#8c9eff",
            A200: "#536dfe",
            A400: "#3d5afe",
            A700: "#304ffe",
        },
        secondary: {
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
    },
})

export type Theme = typeof DarkTheme | typeof LightTheme
