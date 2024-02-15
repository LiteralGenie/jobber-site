import { JobData } from "@/lib/job-data"
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
        if (cursor === null) {
            console.error("page cursor is null")
            return
        }

        const update = queryParams.get()
        update.set("after", cursor.toString())
        queryParams.set(update)
    }

    return (
        <section className="flex flex-col">
            <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                    <PreviewCard
                        data={item}
                        isActive={idx === activeIndex}
                        onClick={() => setActiveIndex(idx)}
                        key={item.id}
                    />
                ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <button
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(prevPageCursor)}
                    disabled={prevPageCursor === null}
                >
                    {"< Previous"}
                </button>
                <button
                    className="border rounded-md h-12"
                    onClick={() => onPageChange(nextPageCursor)}
                    disabled={nextPageCursor === null}
                >
                    {"Next >"}
                </button>
            </div>
        </section>
    )
}
