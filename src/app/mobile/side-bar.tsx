import { GitHub, RssFeed } from "@mui/icons-material"
import { Button, Drawer, IconButton, Typography } from "@mui/material"
import { ReactNode } from "react"

export interface SideBarProps {
    open: boolean
    onClose: () => void
}

export function SideBar({ open, onClose }: SideBarProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className="p-4 w-40 h-full flex flex-col items-start">
                <Typography variant="h6" className="font-bold pb-2">
                    Jobber
                </Typography>

                <div className="flex flex-col gap-2 items-start">
                    <TopBarLink text="FAQ" href="/" />
                    <TopBarLink text="API" href="/" />
                </div>

                <div className="grow"></div>

                <div className="w-full flex justify-center">
                    <TopBarIcon href="/" Icon={<RssFeed />} />

                    <TopBarIcon
                        href="https://github.com/LiteralGenie/jobber-site"
                        Icon={<GitHub />}
                    />
                </div>
            </div>
        </Drawer>
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
            className="min-w-0 p-0"
            sx={{
                color: "text.disabled",
            }}
        >
            <Typography variant="body1">{text}</Typography>
        </Button>
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
