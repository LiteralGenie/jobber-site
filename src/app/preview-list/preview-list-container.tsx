import { PAGE_SIZE } from "@/lib/constants"
import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { FirstPage, LastPage } from "@mui/icons-material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { Button, Paper } from "@mui/material"
import { useEffect, useRef } from "react"
import PreviewList from "./preview-list"
import { usePageLink } from "./usePageLink"

export default function PreviewListContainer() {
    const { jobs, prevPageCursor, nextPageCursor } = useJobsQuery()

    const scrollElRef = useRef<HTMLDivElement>(null)

    const { getLinkProps } = usePageLink()

    // Reset scroll position on content change
    useEffect(() => {
        scrollElRef.current?.scrollTo({ top: 0 })
    }, [jobs])

    return (
        <section className="min-h-0 h-full flex flex-col">
            {/* Card list */}
            <Paper
                variant="outlined"
                className="min-h-0 h-full overflow-auto flex flex-col"
                ref={scrollElRef}
            >
                <PreviewList />
            </Paper>

            {/* Paginator */}
            <nav className="mt-4 grid grid-cols-4 gap-4">
                <Button
                    {...getLinkProps(null)}
                    disabled={prevPageCursor === null}
                    variant="outlined"
                    className="border rounded-md h-12 w-full"
                    aria-label="First page"
                    title="First page"
                >
                    <FirstPage />
                </Button>

                <Button
                    {...getLinkProps(prevPageCursor)}
                    disabled={prevPageCursor === null}
                    variant="outlined"
                    className="border rounded-md h-12 w-full"
                    aria-label="Previous page"
                    title="Previous page"
                >
                    <ChevronLeft />
                </Button>

                <Button
                    {...getLinkProps(nextPageCursor)}
                    disabled={nextPageCursor === null}
                    variant="outlined"
                    className="border rounded-md h-12 w-full"
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
                    className="border rounded-md h-12 w-full"
                    aria-label="Last page"
                    title="Last page"
                >
                    <LastPage />
                </Button>
            </nav>
        </section>
    )
}
