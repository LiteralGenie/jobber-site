import { JobData } from "@/lib/job-data"

export interface PreviewCardProps {
    data: JobData
    onClick: () => void

    isActive: boolean
    isFirst: boolean
    isLast: boolean
}

export default function PreviewCard({
    data,
    onClick,
    isActive,
    isFirst,
    isLast,
}: PreviewCardProps) {
    return (
        <button disabled={isActive} className="w-full">
            <div
                onClick={onClick}
                className={`flex p-4 h-full border-2 ${
                    isActive ? "" : "border-transparent"
                } ${isFirst ? "rounded-tl-md" : ""} ${
                    isLast ? "rounded-bl-md" : ""
                }`}
            >
                {/* Name */}
                <div className="flex flex-col">
                    <h1>{data.title}</h1>
                    <h2>{data.company}</h2>
                    <h2>{data.time_created}</h2>
                </div>

                {/* Divider */}
                <hr className="h-full border-l mx-4" />

                {/* Highlights */}
                <div>highlights</div>
            </div>
        </button>
    )
}
