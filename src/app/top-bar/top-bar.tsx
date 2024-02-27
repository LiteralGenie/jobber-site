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

export function TopBar() {
    return (
        <AppBar position="static" className="pl-2">
            <Toolbar>
                <Typography variant="h6" className="font-bold pr-4">
                    Jobber
                </Typography>

                <div className="flex gap-2">
                    <TopBarLink text="FAQ" href="/" />
                    <TopBarLink text="API" href="/" />
                </div>

                <div className="grow"></div>

                <TopBarIcon href="/" Icon={<RssFeed />} />

                <TopBarIcon
                    href="https://github.com/LiteralGenie/jobber-site"
                    Icon={<GitHub />}
                />
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
            color="inherit"
            className="min-w-0 p-2"
            sx={{
                color: "text.disabled",
                "&:hover": {
                    color: (theme) => alpha(theme.palette.text.disabled, 0.75),
                },
            }}
        >
            {text}
        </Button>
    )
}
