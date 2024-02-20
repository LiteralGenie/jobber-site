import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined"
import { Card } from "@mui/material"

export function EmptyDetails() {
    return (
        <Card variant="outlined">
            <div className="opacity-50 h-full w-full flex flex-col items-center justify-center gap-2">
                <NightsStayOutlinedIcon sx={{ fontSize: 50 }} className="" />
                Nothing selected...
            </div>
        </Card>
    )
}
