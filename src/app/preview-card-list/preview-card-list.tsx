import { JobData } from "@/lib/job-data"
import { FirstPage, LastPage } from "@mui/icons-material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { Button, Divider, Paper } from "@mui/material"
import { useQueryParams } from "../useQueryParams"
import PreviewCard from "./preview-card/preview-card"

export interface PreviewCardListProps {
    activeIndex: number
    setActiveIndex: (idx: number) => void
    jobs: JobData[]
    prevPageCursor: number | null
    nextPageCursor: number | null
}

export default function PreviewCardList({
    activeIndex,
    setActiveIndex,
    jobs: items,
    prevPageCursor,
    nextPageCursor,
}: PreviewCardListProps) {
    const queryParams = useQueryParams()

    function onPageChange(cursor: number | null) {
        const update = queryParams.get()

        if (cursor === null) {
            update.delete("after")
        } else {
            update.set("after", cursor.toString())
        }

        queryParams.set(update)
    }

    // This can be smaller for last page
    // but the last-page button that uses this will be disabled in that case anyways
    const pageSize = items.length

    return (
        <section className="min-h-0 h-full flex flex-col">
            {/* Card list */}
            <Paper
                variant="outlined"
                className="min-h-0 h-full overflow-auto flex flex-col"
            >
                {items.map((item, idx) => (
                    <div key={item.id} className="rounded-md">
                        <PreviewCard
                            data={item}
                            onClick={() => setActiveIndex(idx)}
                            isActive={idx === activeIndex}
                        />

                        {idx == items.length - 1 ? "" : <Divider />}
                    </div>
                ))}
            </Paper>

            {/* Paginator */}
            <nav className="mt-4 grid grid-cols-4 gap-4">
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(null)}
                    disabled={prevPageCursor === null}
                    aria-label="First page"
                    title="First page"
                >
                    <FirstPage />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(prevPageCursor)}
                    disabled={prevPageCursor === null}
                    aria-label="Previous page"
                    title="Previous page"
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(nextPageCursor)}
                    disabled={nextPageCursor === null}
                    aria-label="Next page"
                    title="Next page"
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="outlined"
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(pageSize)}
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
