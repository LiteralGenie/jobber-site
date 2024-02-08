import { JobData } from "@/lib/job-data"

export interface RequirementsProps {
    skills: JobData["skills"]
}

export default function Requirements({ skills }: RequirementsProps) {
    return (
        <div>
            <p>Requirements</p>
            <ul>
                {skills.map((sk) => (
                    <li key={sk.id}>{sk.name}</li>
                ))}
            </ul>
        </div>
    )
}
