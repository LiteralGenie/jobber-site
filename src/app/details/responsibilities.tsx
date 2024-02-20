import { JobData } from "@/lib/job-data"

export interface ResponsibilitiesProps {
    responsibilities: JobData["duties"]
}

export default function Responsibilities({
    responsibilities,
}: ResponsibilitiesProps) {
    return (
        <div>
            <span className="mb-1 font-bold">Responsibilities:</span>
            <ul className="mt-0">
                {responsibilities.map((r) => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        </div>
    )
}
