import { GitHub, RssFeed } from "@mui/icons-material"
import {
    AppBar,
    Button,
    IconButton,
    SxProps,
    Theme,
    Toolbar,
    Typography,
    alpha,
} from "@mui/material"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { ThemeToggle } from "../theme/theme-toggle"

export function TopBar() {
    return (
        <AppBar position="static" className="pl-2">
            <Toolbar>
                <Typography variant="h6" className="font-bold pr-4">
                    Jobber
                </Typography>

                <div className="flex gap-1 pr-2">
                    <TopBarLink text="JOBS" href="/" />
                    <TopBarLink text="FAQ" href="/faq" />
                    <TopBarLink text="API" href="/docs" />
                </div>

                <div className="grow"></div>

                <ThemeToggle size="small" />

                <div className="flex pl-4">
                    <TopBarIcon href="/rss" Icon={<RssFeed />} />

                    <TopBarIcon
                        href="https://github.com/LiteralGenie/jobber-site"
                        Icon={<GitHub />}
                    />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export interface TopBarIconProps {
    Icon: ReactNode
    href: string
}

function TopBarIcon({ Icon, href }: TopBarIconProps) {
    return (
        <IconButton color="inherit" href={href} target="_blank" rel="noopener">
            {Icon}
        </IconButton>
    )
}

export interface TopBarLinkProps {
    text: string
    href: string
}

function TopBarLink({ text, href }: TopBarLinkProps) {
    const current = usePathname()
    const isActive = current === href

    const defaultStyles: SxProps<Theme> = {
        color: (theme) => alpha(theme.palette.primary.contrastText, 0.5),
        "&:hover": {
            color: (theme) => alpha(theme.palette.primary.contrastText, 0.75),
            backgroundColor: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: 4,
        },
    }

    const activeStyles: SxProps<Theme> = {
        color: (theme) => alpha(theme.palette.primary.contrastText, 0.75),
        pointerEvents: "none",
        textDecoration: "underline",
        textUnderlineOffset: 4,
    }

    return (
        <Button
            href={href}
            target="_blank"
            variant="text"
            className="min-w-0 p-2"
            color="info"
            sx={isActive ? activeStyles : defaultStyles}
        >
            {text}
        </Button>
    )
}
