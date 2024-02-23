import { Card, Divider, Skeleton, Typography } from "@mui/material"

export function DetailsSkeleton() {
    const body = [
        "80%",
        "95%",
        "95%",
        "95%",
        "80%",
        "95%",
        "90%",
        "90%",
        "90%",
        "100%",
        "100%",
        "95%",
        "90%",
        "95%",
        "90%",
        "95%",
        "95%",
        "90%",
        "85%",
        "95%",
        "100%",
        "95%",
        "95%",
        "95%",
        "80%",
        "95%",
        "90%",
        "65%",
        "95%",
    ]

    return (
        <Card variant="outlined" className="p-4">
            <Typography>
                <Skeleton className="w-2/3" />
                <Skeleton className="w-1/3" />
                <Skeleton className="w-1/4" />
            </Typography>

            <Divider className="my-4" />

            <Typography>
                <Skeleton className="w-1/5" />
                <Skeleton className="w-1/2" />
                <Skeleton className="w-1/3" />
            </Typography>

            <Divider className="my-4" />

            <Typography>
                <SkeletonLines widths={body} />
            </Typography>
        </Card>
    )
}

function SkeletonLines({ widths }: { widths: string[] }) {
    return (
        <>
            {widths.map((w, idx) => (
                <Skeleton key={idx} sx={{ width: w }} />
            ))}
        </>
    )
}
