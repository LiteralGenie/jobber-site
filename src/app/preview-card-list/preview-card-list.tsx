import { JobData } from "@/lib/job-data"
import PreviewCard from "./preview-card/preview-card"

export interface PreviewCardListProps {
    activeIndex: number
    setActiveIndex: (idx: number) => void
    jobs: JobData[]
    onPrev: () => void
    onNext: () => void
}

export default function PreviewCardList({
    activeIndex,
    setActiveIndex,
    jobs: items,
    onPrev,
    onNext,
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

            <div className="mt-4 grid grid-cols-2 gap-4">
                <button className="border rounded-md h-12" onClick={onPrev}>
                    {"< Previous"}
                </button>
                <button className="border rounded-md h-12" onClick={onNext}>
                    {"Next >"}
                </button>
            </div>
        </section>
    )
}
