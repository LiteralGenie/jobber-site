import { GitHub, RssFeed } from "@mui/icons-material"
import { Button, Drawer, IconButton, Typography } from "@mui/material"
import { ReactNode } from "react"
import { ThemeToggle } from "../theme/theme-toggle"

export interface SidebarProps {
    open: boolean
    onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className="p-4 w-40 h-full flex flex-col items-start">
                <Typography variant="h6" className="font-bold pb-2">
                    Jobber
                </Typography>

                <div className="flex flex-col gap-2 items-start">
                    <SidebarLink text="FAQ" href="/faq" />
                    <SidebarLink text="API" href="/docs" />
                </div>

                <div className="grow"></div>

                <div className="w-full flex justify-center">
                    <SidebarIcon href="/rss" Icon={<RssFeed />} />

                    <SidebarIcon
                        href="https://github.com/LiteralGenie/jobber-site"
                        Icon={<GitHub />}
                    />
                </div>

                <div className="w-full pt-2 flex justify-center">
                    <ThemeToggle />
                </div>
            </div>
        </Drawer>
    )
}

export interface SidebarLinkProps {
    text: string
    href: string
}

function SidebarLink({ text, href }: SidebarLinkProps) {
    return (
        <Button
            href={href}
            target="_blank"
            variant="text"
            className="min-w-0 p-0"
            sx={{
                color: "text.disabled",
            }}
        >
            <Typography variant="body1">{text}</Typography>
        </Button>
    )
}

export interface SidebarIconProps {
    Icon: ReactNode
    href: string
}

function SidebarIcon({ Icon, href }: SidebarIconProps) {
    return (
        <IconButton color="inherit" href={href} target="_blank" rel="noopener">
            {Icon}
        </IconButton>
    )
}
