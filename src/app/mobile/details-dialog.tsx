import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { useActiveJob } from "@/lib/providers/active-job-provider"
import { ChevronLeft, ChevronRight, WestOutlined } from "@mui/icons-material"
import {
    Button,
    ButtonGroup,
    Dialog,
    Paper,
    Slide,
    Typography,
    alpha,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef, useMemo } from "react"
import { CopyLinkButton } from "../details/copy-link-button"
import { DetailsContent } from "../details/details-content"

export function DetailsDialog() {
    const { jobs } = useJobsQuery()
    const activeJob = useActiveJob()

    const [prevJob, nextJob] = useMemo(() => {
        if (!activeJob) {
            return [null, null]
        }

        const idx = jobs.findIndex((job) => job.id === activeJob.id)
        if (idx === -1) {
            console.error("activeJob not in list", activeJob, jobs)
            return [null, null]
        }

        const prevJob = jobs[idx - 1] ?? null
        const nextJob = jobs[idx + 1] ?? null

        return [prevJob, nextJob]
    }, [activeJob, jobs])
    console.log(prevJob, nextJob)

    const href = typeof window === "undefined" ? "" : window.location.href

    return (
        <Dialog open={!!activeJob} fullScreen TransitionComponent={Transition}>
            {activeJob && (
                <Paper className="overflow-hidden h-full flex flex-col">
                    <Paper
                        elevation={4}
                        className="p-4 flex justify-between items-center"
                    >
                        <Typography variant="h6">{activeJob.title}</Typography>

                        <CopyLinkButton href={href} size="small" />
                    </Paper>

                    <div className="overflow-auto">
                        <DetailsContent job={activeJob} />
                    </div>

                    <Paper elevation={2} className="p-4 flex justify-between">
                        <Button
                            href="#"
                            variant="text"
                            startIcon={<WestOutlined />}
                            aria-label="Back to search results"
                        >
                            Back to list
                        </Button>

                        <ButtonGroup aria-label="Navigation">
                            <Button
                                href={"#" + prevJob?.id}
                                disabled={!prevJob}
                                aria-label="Previous post"
                                // Fix missing borders when neighbor is disabled
                                // https://github.com/mui/material-ui/issues/35045
                                sx={{
                                    borderRightColor: (theme) =>
                                        !nextJob
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.5
                                              )
                                            : "",
                                }}
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                href={"#" + nextJob?.id}
                                disabled={!nextJob}
                                aria-label="Next post"
                            >
                                <ChevronRight />
                            </Button>
                        </ButtonGroup>
                    </Paper>
                </Paper>
            )}
        </Dialog>
    )
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="left" ref={ref} {...props} />
})
