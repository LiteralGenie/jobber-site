import { useActiveJob } from "@/lib/providers/active-job-provider"
import { WestOutlined } from "@mui/icons-material"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, Dialog, Paper, Slide, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef } from "react"
import { CopyLinkButton } from "../details/copy-link-button"
import { DetailsContent } from "../details/details-content"
import { hijackNavigation } from "../preview-list/usePageLink"

export function DetailsDialog() {
    const activeJob = useActiveJob()

    const href = typeof window === "undefined" ? "" : window.location.href

    // Unset active job
    function handleClose() {
        window.location.hash = ""
    }

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

                    <Paper elevation={2} className="p-2 flex justify-between">
                        <Button
                            href="#"
                            onClick={(ev) =>
                                hijackNavigation(ev, () => handleClose())
                            }
                            variant="text"
                            startIcon={<WestOutlined />}
                            aria-label="Back to search results"
                        >
                            Back to list
                        </Button>

                        <Button
                            href={`https://www.indeed.com/viewjob?jk=${activeJob.id}`}
                            target="_blank"
                            rel="noopener"
                            color="primary"
                            variant="contained"
                            endIcon={<LaunchIcon />}
                            aria-label="Apply on Indeed"
                            title="Apply on Indeed"
                        >
                            Indeed
                        </Button>
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
