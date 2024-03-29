import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { AppDrawer } from "./app-drawer"

export function TopBarWithDrawer() {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
            <AppBar position="static" className="pl-2">
                <Toolbar className="px-2 flex gap-2">
                    <IconButton
                        onClick={() => setShowSidebar(true)}
                        aria-label="Menu"
                        title="Menu"
                        sx={{
                            color: "inherit",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className="font-bold pr-4">
                        Jobber
                    </Typography>
                </Toolbar>
            </AppBar>

            <AppDrawer
                open={showSidebar}
                onClose={() => setShowSidebar(false)}
            />
        </>
    )
}
