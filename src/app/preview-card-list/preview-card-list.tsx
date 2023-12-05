import { JobData } from "@/lib/job-data"
import PreviewCard from "./preview-card/preview-card"
import { useState } from "react"

export interface PreviewCardListProps {
    items: JobData[]
}

export default function PreviewCardList({ items }: PreviewCardListProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
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
    )
}
