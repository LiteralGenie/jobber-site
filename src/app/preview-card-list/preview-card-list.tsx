import { JobData } from "@/lib/job-data"
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
        <section className="flex flex-col gap-4">
            {items.map((item, idx) => (
                <PreviewCard
                    data={item}
                    isActive={idx === activeIndex}
                    onClick={() => setActiveIndex(idx)}
                    key={item.id}
                />
            ))}
        </section>
    )
}
