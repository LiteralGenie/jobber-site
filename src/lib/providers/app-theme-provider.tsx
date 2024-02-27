import { DarkTheme, LightTheme } from "@/app/theme/themes"
import { Theme, ThemeProvider } from "@mui/material"
import { ReactNode, createContext, useContext, useMemo } from "react"
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
    const { value: themeName, setValue } = useLocalStorage("theme")
    const theme = useMemo(
        () => (themeName === "light" ? LightTheme : DarkTheme),
        [themeName]
    )

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
