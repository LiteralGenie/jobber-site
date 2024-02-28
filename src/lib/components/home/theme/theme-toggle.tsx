import { useAppTheme } from "@/lib/providers/app-theme-provider"
import { DarkMode, LightMode } from "@mui/icons-material"
import { ToggleButton, ToggleButtonGroup, alpha } from "@mui/material"
import { DarkTheme, LightTheme } from "./themes"

export interface ThemeToggleProps {
    size?: "small" | "medium"
}

export function ThemeToggle({ size }: ThemeToggleProps) {
    const { theme, setTheme } = useAppTheme()

    const fontSize = size === "small" ? "text-[1rem]" : "text-small"
    const color = theme === LightTheme ? "primary" : "secondary"

    return (
        <ToggleButtonGroup value={theme}>
            <ToggleButton
                value={LightTheme}
                onClick={() => setTheme(LightTheme)}
                disabled={theme === LightTheme}
                className="p-2"
                aria-label="Light Mode"
                title="Light Mode"
            >
                <LightMode
                    className={`${fontSize}`}
                    sx={{
                        color: alpha("#fbc02d", theme === LightTheme ? 1 : 0.5),
                        pointerEvents: theme === LightTheme ? "none" : "",
                    }}
                />
            </ToggleButton>

            <ToggleButton
                value={DarkTheme}
                onClick={() => setTheme(DarkTheme)}
                disabled={theme === DarkTheme}
                className="p-2"
                color={color}
                aria-label="Dark Mode"
                title="Dark Mode"
            >
                <DarkMode
                    className={`${fontSize}`}
                    sx={{
                        color: alpha("#7c98a6", theme === DarkTheme ? 1 : 0.5),
                    }}
                />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
