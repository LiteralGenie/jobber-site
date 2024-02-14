import { JobData } from "@/lib/job-data"
import { Pagination } from "@mui/material"
import PreviewCard from "./preview-card/preview-card"

export interface PreviewCardListProps {
    activeIndex: number
    setActiveIndex: (idx: number) => void
    jobs: JobData[]
}

export default function PreviewCardList({
    activeIndex,
    setActiveIndex,
    jobs: items,
}: PreviewCardListProps) {
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

            <div className="border mt-4 rounded-md w-full flex justify-center">
                <Pagination count={10} shape="rounded" size="large" />
            </div>
        </section>
    )
}
