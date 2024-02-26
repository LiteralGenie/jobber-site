import { useActiveJob } from "@/lib/providers/active-job-provider"
import { ChevronLeft, ChevronRight, WestOutlined } from "@mui/icons-material"
import {
    Button,
    ButtonGroup,
    Dialog,
    Paper,
    Slide,
    Typography,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef } from "react"
import { CopyLinkButton } from "../details/copy-link-button"
import { DetailsContent } from "../details/details-content"

export function DetailsDialog() {
    const activeJob = useActiveJob()

    const href = typeof window === "undefined" ? "" : window.location.href

    // Unset active job
    function handleClose() {
        window.location.hash = ""

        // Remove the trailing #
        // note: The above is still neccessary to notify hooks of url changes
        //       This alone doesn't trigger any popstate / hashchange events
        window.history.replaceState(
            { ...window.history.state },
            "",
            window.location.href.split("#")[0]
        )
    }

    return (
        <Dialog
            open={!!activeJob}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
        >
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
                            onClick={handleClose}
                            variant="text"
                            startIcon={<WestOutlined />}
                            aria-label="Back to search results"
                        >
                            Back to list
                        </Button>

                        <ButtonGroup aria-label="Navigation">
                            <Button aria-label="Previous post">
                                <ChevronLeft />
                            </Button>
                            <Button aria-label="Next post">
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
