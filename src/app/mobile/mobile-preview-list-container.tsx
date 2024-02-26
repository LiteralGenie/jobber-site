import { PAGE_SIZE } from "@/lib/constants"
import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import {
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
} from "@mui/icons-material"
import { Button, Paper } from "@mui/material"
import { useEffect, useRef } from "react"
import PreviewList from "../preview-list/preview-list"
import { usePageLink } from "../preview-list/usePageLink"
import SearchBar from "./search-bar"

export function MobilePreviewListContainer() {
    const { jobs, prevPageCursor, nextPageCursor } = useJobsQuery()

    const { getLinkProps } = usePageLink()

    const scrollElRef = useRef<HTMLDivElement>(null)

    // Reset scroll position on content change
    useEffect(() => {
        scrollElRef.current?.scrollTo({ top: 0 })
    }, [jobs])

    return (
        <Paper variant="outlined" className="h-full flex flex-col">
            <Paper elevation={2}>
                <SearchBar />
            </Paper>

            <Paper
                variant="outlined"
                className="min-h-0 h-full overflow-auto flex flex-col"
                ref={scrollElRef}
            >
                <PreviewList replaceHistory={true} />
            </Paper>

            <Paper elevation={2} className="flex justify-center">
                <nav className="p-2 max-w-sm flex justify-center gap-4">
                    <Button
                        {...getLinkProps(null)}
                        disabled={prevPageCursor === null}
                        variant="outlined"
                        className="border rounded-md h-12 min-w-0"
                        aria-label="First page"
                        title="First page"
                    >
                        <FirstPage />
                    </Button>

                    <Button
                        {...getLinkProps(prevPageCursor)}
                        disabled={prevPageCursor === null}
                        variant="outlined"
                        className="border rounded-md h-12 min-w-0"
                        aria-label="Previous page"
                        title="Previous page"
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        {...getLinkProps(nextPageCursor)}
                        disabled={nextPageCursor === null}
                        variant="outlined"
                        className="border rounded-md h-12 min-w-0"
                        aria-label="Next page"
                        title="Next page"
                    >
                        <ChevronRight />
                    </Button>

                    <Button
                        // If there are active filters, using PAGE_SIZE as cursor can lead to empty page but whatever
                        {...getLinkProps(PAGE_SIZE)}
                        disabled={nextPageCursor === null}
                        variant="outlined"
                        className="border rounded-md h-12 min-w-0"
                        aria-label="Last page"
                        title="Last page"
                    >
                        <LastPage />
                    </Button>
                </nav>
            </Paper>
        </Paper>
    )
}
