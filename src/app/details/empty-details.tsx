import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined"
import { Card, Typography } from "@mui/material"

export function EmptyDetails() {
    return (
        <Card variant="outlined">
            <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                <NightsStayOutlinedIcon
                    sx={{ fontSize: 50, color: "text.disabled" }}
                    className=""
                />
                <Typography sx={{ color: "text.disabled" }}>
                    Nothing selected...
                </Typography>
            </div>
        </Card>
    )
}
