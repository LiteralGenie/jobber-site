import { JobData } from "@/lib/job-data"

export interface ResponsibilitiesProps {
    responsibilities: JobData["duties"]
}

export default function Responsibilities({
    responsibilities,
}: ResponsibilitiesProps) {
    return (
        <div>
            <p className="mb-1">Responsibilities:</p>
            <ul className="mt-0">
                {responsibilities.map((r) => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        </div>
    )
}
