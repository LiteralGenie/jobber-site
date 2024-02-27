import { GitHub, RssFeed } from "@mui/icons-material"
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    alpha,
} from "@mui/material"
import { ReactNode } from "react"
import { ThemeToggle } from "../theme/theme-toggle"

export function TopBar() {
    return (
        <AppBar position="static" className="pl-2">
            <Toolbar>
                <Typography variant="h6" className="font-bold pr-4">
                    Jobber
                </Typography>

                <div className="flex gap-2 pr-2">
                    <TopBarLink text="FAQ" href="/" />
                    <TopBarLink text="API" href="/" />
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
    return (
        <Button
            href={href}
            target="_blank"
            variant="text"
            className="min-w-0 p-2"
            sx={{
                color: (theme) =>
                    alpha(theme.palette.primary.contrastText, 0.5),
                "&:hover": {
                    color: (theme) =>
                        alpha(theme.palette.primary.contrastText, 0.75),
                },
            }}
        >
            {text}
        </Button>
    )
}
