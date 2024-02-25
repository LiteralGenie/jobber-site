import { Card, Typography } from "@mui/material"

export function EmptyDetails() {
    return (
        <Card variant="outlined">
            <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                <Typography fontSize={20} sx={{ color: "text.disabled" }}>
                    Nothing selected...
                </Typography>
            </div>
        </Card>
    )
}
