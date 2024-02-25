import { Dialog } from "@mui/material"
import Search from "./search"

export interface SearchDialogProps {
    open: boolean
    onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Search />
        </Dialog>
    )
}
