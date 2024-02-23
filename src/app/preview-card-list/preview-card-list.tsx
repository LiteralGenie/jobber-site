import { useJobsQuery } from "@/lib/hooks/useJobsQuery"
import { FirstPage, LastPage } from "@mui/icons-material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { Button, Divider, Paper, Typography } from "@mui/material"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useMemo, useRef } from "react"
import PreviewCard from "./preview-card/preview-card"

export default function PreviewCardList() {
    const { jobs, isFetching, prevPageCursor, nextPageCursor, activeJob } =
        useJobsQuery()

    const scrollElRef = useRef<HTMLDivElement>(null)

    // This can be smaller for last page
    // but the last-page button that uses this will be disabled in that case anyways
    const pageSize = useMemo(() => jobs?.length, [jobs])

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
                {!isFetching ? (
                    <>
                        {jobs.map((item, idx) => (
                            <div key={item.id} className="rounded-md">
                                <PreviewCard
                                    job={item}
                                    isActive={item.id === activeJob?.id}
                                />

                                {idx == jobs.length - 1 ? "" : <Divider />}
                            </div>
                        ))}

                        {/* Handle empty case */}
                        {jobs.length === 0 ? (
                            <Typography
                                className="h-full flex items-center justify-center"
                                sx={{ color: "text.disabled" }}
                            >
                                No matching jobs found
                            </Typography>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    "loading"
                )}
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
                    // If there are active filters, using pageSize as cursor can lead to empty page but whatever
                    onClick={() => handlePageChange(pageSize)}
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
