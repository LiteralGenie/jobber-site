import { JobData } from "@/lib/job-data"

export interface RequirementsProps {
    skills: JobData["skills"]
}

export default function Requirements({ skills }: RequirementsProps) {
    return (
        <div>
            <p>Requirements</p>
            <ul>
                {Object.entries(skills).map(([k, v]) => (
                    <li key={k}>
                        {k}: {v}+ years
                    </li>
                ))}
            </ul>
        </div>
    )
}
