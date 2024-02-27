import { Theme, ThemeProvider } from "@mui/material"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { DarkTheme, LightTheme } from "../components/home/theme/themes"
import { useLocalStorage } from "../hooks/use-local-storage"

interface AppThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null)

export function useAppTheme(): AppThemeContextValue {
    const ctx = useContext(AppThemeContext)
    if (ctx === null) {
        throw new Error("No provider for ThemeContext")
    }

    return ctx
}

export interface AppThemeProviderProps {
    children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
    // Load the default from system preference on page load
    const [defaultTheme, setDefaultTheme] = useState<Theme>(DarkTheme)
    useEffect(() => {
        const prefersLight = window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches
        setDefaultTheme(prefersLight ? LightTheme : DarkTheme)
    }, [])

    // Load the last-picked theme from localStorage
    const { value: themeName, setValue } = useLocalStorage("theme")
    const theme = useMemo(() => {
        switch (themeName) {
            case "light":
                return LightTheme
            case "dark":
                return DarkTheme
            default:
                return defaultTheme
        }
    }, [themeName, defaultTheme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            const themeName = theme === LightTheme ? "light" : "dark"
            setValue(themeName)
        },
    }

    return (
        <AppThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppThemeContext.Provider>
    )
}
