import { JobData } from "@/lib/job-data"

export interface ResponsibilitiesProps {
    responsibilities: JobData["duties"]
}

export default function Responsibilities({
    responsibilities,
}: ResponsibilitiesProps) {
    return (
        <div>
            <p>Responsibilities</p>
            <ul>
                {responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                ))}
            </ul>
        </div>
    )
}
