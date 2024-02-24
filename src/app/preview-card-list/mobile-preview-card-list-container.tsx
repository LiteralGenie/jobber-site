import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Button, ButtonGroup, Paper } from "@mui/material"
import MobileSearchBar from "../search/mobile-search-bar"
import PreviewCardList from "./preview-card-list"
import { usePageLink } from "./usePageLink"

export function MobilePreviewCardListContainer() {
    const { prevPageCursor, nextPageCursor } = useJobsQuery()

    const { getLinkProps } = usePageLink()

    return (
        <Paper variant="outlined" className="h-full flex flex-col">
            <MobileSearchBar />

            <div className="min-h-0 h-full overflow-auto flex flex-col">
                <PreviewCardList />
            </div>

            <Paper elevation={2} className="p-2 flex justify-end">
                <ButtonGroup variant="outlined">
                    <Button
                        disabled={prevPageCursor === null}
                        aria-label="Last page"
                        title="Last page"
                        startIcon={<ChevronLeft />}
                        sx={{
                            ".MuiButton-startIcon": {
                                marginRight: 0,
                            },
                        }}
                        {...getLinkProps(prevPageCursor)}
                    >
                        Prev
                    </Button>

                    <Button
                        disabled={nextPageCursor === null}
                        aria-label="Last page"
                        title="Last page"
                        endIcon={<ChevronRight />}
                        sx={{
                            ".MuiButton-endIcon": {
                                marginLeft: 0,
                            },
                        }}
                        {...getLinkProps(nextPageCursor)}
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </Paper>
        </Paper>
    )
}
