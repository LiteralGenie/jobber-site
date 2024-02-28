import { useActiveJob } from "@/lib/providers/active-job-provider"
import { useHashContext } from "@/lib/providers/hash-provider"
import { WestOutlined } from "@mui/icons-material"
import LaunchIcon from "@mui/icons-material/Launch"
import { Button, Dialog, Paper, Slide, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef } from "react"
import { CopyLinkButton } from "../details/copy-link-button"
import { DetailsContent } from "../details/details-content"
import { hijackNavigation } from "../preview-list/usePageLink"

export interface DetailsDialogProps {
    shouldPopStateOnClose: boolean
}

export function DetailsDialog({ shouldPopStateOnClose }: DetailsDialogProps) {
    const activeJob = useActiveJob()

    const { recheckHash } = useHashContext()

    const url = typeof window === "undefined" ? "" : window.location.href

    function handleClose() {
        if (shouldPopStateOnClose) {
            // If the last history entry was for the preview list
            // (ie they entered this dialog by clicking a card, not following a link someone pasted)
            // then the nav history will look like this
            //   list page #1
            //   card #1
            //
            // if we follow this href="#" link as-is, the history will eventually look like
            //   list page #1
            //   card #1
            //   list page #1
            //   card #2
            //   list page #1
            //   list page #2
            //   card ...
            //   ...
            //
            // so instead, lets back() from the current card link so the history is prettier
            // list page #1
            // list page #2
            // ...
            window.history.back()
        } else {
            // Otherwise, if they followed a direct link to this card
            //   (some other domain)
            //   card #1
            //
            // just rewrite the current url / entry to point to the list page
            //   (some other domain)
            //   list page #1
            const update = new URL(window.location.href)
            update.hash = ""

            window.history.replaceState(
                { ...window.history.state },
                "",
                update.href,
            )
            recheckHash()
        }
    }

    return (
        <Dialog open={!!activeJob} fullScreen TransitionComponent={Transition}>
            {activeJob && (
                <Paper className="overflow-hidden h-full flex flex-col">
                    <Paper
                        elevation={4}
                        className="p-4 flex gap-2 justify-between items-center"
                    >
                        <Typography variant="h6">{activeJob.title}</Typography>

                        <CopyLinkButton
                            href={url}
                            buttonProps={{
                                size: "small",
                            }}
                            snackbarProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                                className: "mb-12 w-1/2 mx-auto",
                            }}
                        />
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
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />
})
