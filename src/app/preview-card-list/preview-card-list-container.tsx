import { PAGE_SIZE } from "@/lib/constants"
import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { FirstPage, LastPage } from "@mui/icons-material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { Button, Paper } from "@mui/material"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useRef } from "react"
import PreviewCardList from "./preview-card-list"

export default function PreviewCardListContainer() {
    const { jobs, prevPageCursor, nextPageCursor } = useJobsQuery()

    const scrollElRef = useRef<HTMLDivElement>(null)

    const [after, setAfter] = useQueryState("after", parseAsInteger)

    function handlePageChange(cursor?: number | null) {
        // Clear url fragment
        const update = new URL(window.location.href)
        update.hash = ""
        window.history.pushState({ ...window.history.state }, "", update.href)

        // Update query params
        setAfter(cursor ?? null, { shallow: true, history: "replace" })
    }

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
                <PreviewCardList />
            </Paper>

            {/* Paginator */}
            <nav className="mt-4 grid grid-cols-4 gap-4">
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => handlePageChange(null)}
                    disabled={prevPageCursor === null}
                    aria-label="First page"
                    title="First page"
                >
                    <FirstPage />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => handlePageChange(prevPageCursor)}
                    disabled={prevPageCursor === null}
                    aria-label="Previous page"
                    title="Previous page"
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => handlePageChange(nextPageCursor)}
                    disabled={nextPageCursor === null}
                    aria-label="Next page"
                    title="Next page"
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    // If there are active filters, using PAGE_SIZE as cursor can lead to empty page but whatever
                    onClick={() => handlePageChange(PAGE_SIZE)}
                    disabled={nextPageCursor === null}
                    aria-label="Last page"
                    title="Last page"
                >
                    <LastPage />
                </Button>
            </nav>
        </section>
    )
}
