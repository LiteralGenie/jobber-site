import { JobData } from "@/lib/job-data"

export interface PreviewCardProps {
    data: JobData
    isActive: boolean
    onClick: () => void
}

export default function PreviewCard({
    data,
    isActive,
    onClick,
}: PreviewCardProps) {
    return (
        // Active cards have a thicker border
        // Inactive cards have an additional invisible outer border to prevent jittering
        <div
            className={`${
                isActive ? "" : "border border-transparent border-1"
            }`}
        >
            <div
                onClick={onClick}
                className={`flex border p-4 rounded-md h-full ${
                    isActive ? "border-2" : "cursor-pointer"
                }`}
            >
                {/* Name */}
                <div className="flex flex-col">
                    <h1>{data.title}</h1>
                    <h2>{data.company}</h2>
                    <h2>{data.time_updated}</h2>
                </div>

                {/* Divider */}
                <hr className="h-full border-l mx-4" />

                {/* Highlights */}
                <div>highlights</div>
            </div>
        </div>
    )
}
