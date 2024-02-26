import LinkIcon from "@mui/icons-material/Link"
import { Button, ButtonProps, Snackbar } from "@mui/material"
import { useState } from "react"

export interface CopyLinkButtonProps extends ButtonProps {
    href: string
}

export function CopyLinkButton({ href, ...props }: CopyLinkButtonProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function handleLinkCopy() {
        navigator.clipboard.writeText(href)
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = (_: any, reason?: string) => {
        if (reason === "clickaway") {
            return
        }

        setSnackbarOpen(false)
    }

    return (
        <>
            <Button
                size="large"
                color="primary"
                variant="outlined"
                aria-label="Copy link"
                title="Copy link"
                onClick={handleLinkCopy}
                {...props}
            >
                <LinkIcon />
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                message="Copied link to clipboard"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </>
    )
}
