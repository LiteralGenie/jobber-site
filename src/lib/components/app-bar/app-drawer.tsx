import { GitHub, RssFeed } from "@mui/icons-material"
import {
    Button,
    ButtonProps,
    Divider,
    Drawer,
    IconButton,
    Typography,
} from "@mui/material"
import { usePathname } from "next/navigation"
import { MouseEvent, ReactNode } from "react"
import { ThemeToggle } from "../home/theme/theme-toggle"

export interface AppDrawerProps {
    open: boolean
    onClose: () => void
}

export function AppDrawer({ open, onClose }: AppDrawerProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className="w-48 h-full flex flex-col items-start">
                <Typography variant="h6" className="font-bold py-2 px-4">
                    Jobber
                </Typography>

                <div className="flex flex-col gap-2 items-start w-full">
                    <Divider flexItem />
                    <DrawerLink text="Jobs" href="/" onClose={onClose} />
                    <Divider flexItem />
                    <DrawerLink text="FAQ" href="/faq" onClose={onClose} />
                    <Divider flexItem />
                    <DrawerLink text="API" href="/docs" onClose={onClose} />
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

export interface DrawerLinkProps extends ButtonProps {
    text: string
    href: string
    onClose: AppDrawerProps["onClose"]
}

function DrawerLink({ text, href, onClose }: DrawerLinkProps) {
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
