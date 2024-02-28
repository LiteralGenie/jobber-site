import { GitHub, RssFeed } from "@mui/icons-material"
import { Button, Divider, Drawer, IconButton, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import { MouseEvent, ReactNode } from "react"
import { ThemeToggle } from "../theme/theme-toggle"

export interface SidebarProps {
    open: boolean
    onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className="w-40 h-full flex flex-col items-start">
                <Typography variant="h6" className="font-bold py-2 px-4">
                    Jobber
                </Typography>

                <div className="flex flex-col gap-2 items-start w-full">
                    <Divider flexItem />
                    <SidebarLink text="Jobs" href="/" onClose={onClose} />
                    <Divider flexItem />
                    <SidebarLink text="FAQ" href="/faq" onClose={onClose} />
                    <Divider flexItem />
                    <SidebarLink text="API" href="/docs" onClose={onClose} />
                    <Divider flexItem />
                </div>

                <div className="grow"></div>

                <div className="w-full flex justify-center px-4">
                    <SidebarIcon href="/rss" Icon={<RssFeed />} />

                    <SidebarIcon
                        href="https://github.com/LiteralGenie/jobber-site"
                        Icon={<GitHub />}
                    />
                </div>

                <div className="w-full pt-2 pb-4 flex justify-center">
                    <ThemeToggle />
                </div>
            </div>
        </Drawer>
    )
}

export interface SidebarLinkProps {
    text: string
    href: string
    onClose: SidebarProps["onClose"]
}

function SidebarLink({ text, href, onClose }: SidebarLinkProps) {
    const current = usePathname()
    const isActive = current === href

    // If this link is for the current page,
    // do nothing but close sidebar
    function onClick(ev: MouseEvent) {
        if (isActive) {
            ev.preventDefault()
            onClose()
        }
    }

    return (
        <Button
            href={href}
            target="_blank"
            onClick={onClick}
            variant="text"
            className="min-w-0 px-4 py-0 normal-case"
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
